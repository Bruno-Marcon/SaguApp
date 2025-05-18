import { useState, useCallback } from 'react';
import TemplateScreen from '@//components/templates/scrollView/templateScreen';
import AuthorizationTemplate from '@//components/templates/authorization/authorizationTemplate';

export default function AuthorizationsPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const handleRefreshEnd = () => {
    setRefreshing(false);
  };

  return (
    <TemplateScreen withSafeArea withHeader={false} withBottomBar>
      <AuthorizationTemplate refreshing={refreshing} onRefreshEnd={handleRefreshEnd} />
    </TemplateScreen>
  );
}
