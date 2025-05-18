import { View } from 'react-native';
import DetailLabel from '../../../atoms/text/detailLabel';
import { Authorization } from '../../../../../types/authorizations';

type Props = {
  authorization: Authorization;
  studentName: string;
  responsibleName: string;
};

export default function AuthorizationDetailsSection({
  authorization,
  studentName,
  responsibleName,
}: Props) {
  return (
    <View className="space-y-3 mb-4">
      <DetailLabel label="Aluno" value={studentName} />
      <DetailLabel label="Responsável" value={responsibleName} />
      <DetailLabel label="Status" value={authorization.attributes.status} />
      <DetailLabel
        label="Data"
        value={new Date(authorization.attributes.date).toLocaleDateString('pt-BR')}
      />
      {authorization.attributes.description && (
        <DetailLabel label="Descrição" value={authorization.attributes.description} />
      )}
    </View>
  );
}
