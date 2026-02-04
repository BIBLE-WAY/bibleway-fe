import React, { useState, useEffect } from 'react';
import {
  SidebarContainer,
  SidebarTitle,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  PeopleList,
} from './PeopleSearchSidebar.styles';
import { userService, type UserProfile } from '../../services/user/user.service';
import PeopleListItem from './PeopleListItem';
import { showError } from '../../utils/toast';
import { useI18n } from '../../i18n';

interface PeopleSearchSidebarProps {
  onPersonSelect: (personId: string) => void;
  selectedPersonId?: string;
  onViewChange: (view: 'profile' | 'peopleSearch') => void;
}

const PeopleSearchSidebar: React.FC<PeopleSearchSidebarProps> = ({
  onPersonSelect,
  selectedPersonId,
  onViewChange,
}) => {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [people, setPeople] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (query: string) => {
    setLoading(true);
    const response = await userService.searchUsers(query, 20);
    if (response.success) {
      setPeople(response.data);
    } else {
      showError(response.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchQuery.length >= 2) {
        fetchUsers(searchQuery);
      } else {
        setPeople([]);
      }
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  const handlePersonClick = (personId: string) => {
    if (onPersonSelect) {
      onPersonSelect(personId);
    }
  };

  return (
    <SidebarContainer>
      <SidebarTitle>{t('people.searchPeople')}</SidebarTitle>
      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder={t('people.searchPeoplePlaceholder')}
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        />
        <SearchIcon>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </SearchIcon>
      </SearchWrapper>
      <PeopleList>
        {loading && <div style={{ padding: '10px', textAlign: 'center', color: '#6B7280' }}>{t('people.searching')}</div>}

        {!loading && people.length === 0 && searchQuery.length >= 2 && (
          <div style={{ padding: '10px', textAlign: 'center', color: '#6B7280' }}>{t('people.noUsersFound')}</div>
        )}

        {!loading && searchQuery.length < 2 && (
          <div style={{ padding: '10px', textAlign: 'center', color: '#6B7280' }}>{t('people.searchPrompt')}</div>
        )}

        {people.map((person) => (
          <PeopleListItem
            key={person.user_id}
            person={person}
            isSelected={selectedPersonId === person.user_id}
            onSelect={handlePersonClick}
            onViewChange={onViewChange}
          />
        ))}
      </PeopleList>
    </SidebarContainer>
  );
};

export default PeopleSearchSidebar;
