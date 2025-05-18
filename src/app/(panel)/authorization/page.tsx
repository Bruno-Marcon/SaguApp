import { useState, useCallback } from 'react';
import TemplateScreen from '@//components/templates/scrollView/templateScreen';
import AuthorizationTemplate from '@//components/templates/authorization/authorizationTemplate';
import { Authorization } from '../../../../types/authorizations';
import AuthorizationModal from '@//components/organisms/modal/authorizationModal';

export default function AuthorizationsPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedAuthorization, setSelectedAuthorization] = useState<Authorization | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const handleRefreshEnd = () => {
    setRefreshing(false);
  };

  const handleRefreshFromModal = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <TemplateScreen withSafeArea withHeader={false} withBottomBar>
        <AuthorizationTemplate
          refreshing={refreshing}
          onRefreshEnd={handleRefreshEnd}
          onCardPress={setSelectedAuthorization}
          refreshKey={refreshKey}
        />
      </TemplateScreen>

      <AuthorizationModal
        visible={!!selectedAuthorization}
        onClose={() => setSelectedAuthorization(null)}
        authorizationId={selectedAuthorization?.id ?? null}
        authorization={selectedAuthorization}
        onSave={handleRefreshFromModal}
      />
    </>
  );
}
