import React, { useState } from "react";
import {
  ProfileWrapper,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyState,
  PageContainer,
  PeopleSearchWrapper,
} from "./PeoplePage.styles";
import PeopleSearchSidebar from "../../components/PeopleSearchSidebar/PeopleSearchSidebar";
import ProfileViewer from "../../components/ProfileViewer/ProfileViewer";
import { useI18n } from "../../i18n/hooks";

const PeoplePage: React.FC = () => {
  const { t } = useI18n();
  const [selectedPersonId, setSelectedPersonId] = useState<string | undefined>();
  const [selectedView, setSelectedView] = useState<"profile" | "peopleSearch">("peopleSearch");

  const handlePersonSelect = (personId: string) => {
    setSelectedPersonId(personId);
    setSelectedView("profile");
  };

  const onCloseProfileWindow = () => {
    setSelectedPersonId(undefined);
    setSelectedView("peopleSearch");
  };

  const changeView = (view: "profile" | "peopleSearch") => {
    setSelectedView(view);
    if (view === "peopleSearch") {
      setSelectedPersonId(undefined);
    }
  };

  return (
    <PageContainer>
      <PeopleSearchWrapper $shouldShow={selectedView === "peopleSearch"}>
        <PeopleSearchSidebar
          selectedPersonId={selectedPersonId}
          onPersonSelect={handlePersonSelect}
          onViewChange={changeView}
        />
      </PeopleSearchWrapper>

      {selectedView === "profile" && selectedPersonId && (
        <ProfileWrapper>
          <ProfileViewer userId={selectedPersonId} onBack={onCloseProfileWindow} />
        </ProfileWrapper>
      )}

      {selectedView === "peopleSearch" && (
        <EmptyState>
          <EmptyStateTitle>{t("pages.peoplePage.noPersonSelected")}</EmptyStateTitle>
          <EmptyStateDescription>{t("pages.peoplePage.selectPersonDescription")}</EmptyStateDescription>
        </EmptyState>
      )}
    </PageContainer>
  );
};

export default PeoplePage;
