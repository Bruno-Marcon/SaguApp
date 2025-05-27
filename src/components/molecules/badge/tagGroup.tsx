import { View } from 'react-native';
import Tag from '../../atoms/badge/tag';

interface Props {
  status?: string;
  kind?: string;
  severity?: string;
}

export default function TagGroup({ status, kind, severity }: Props) {
  const translateStatus = (status?: string) => {
    switch ((status || '').toLowerCase()) {
      case 'open':
      case 'aberta':
        return 'Aberta';
      case 'in_progress':
      case 'em andamento':
        return 'Em andamento';
      case 'resolved':
      case 'resolvida':
        return 'Resolvida';
      case 'pending':
        return 'Pendente';
      case 'approved':
        return 'Aprovada';
      case 'refused':
        return 'Rejeitada';
      default:
        return '-';
    }
  };

  const translateKind = (kind?: string) => {
    switch ((kind || '').toLowerCase()) {
      case 'other':
        return 'Outro';
      case 'discipline':
        return 'Disciplina';
      case 'administrative':
        return 'Administrativa';
      default:
        return '-';
    }
  };

  const translateSeverity = (severity?: string) => {
    switch ((severity || '').toLowerCase()) {
      case 'low':
        return 'Baixa';
      case 'medium':
        return 'Média';
      case 'high':
        return 'Alta';
      default:
        return '-';
    }
  };

  const getStatusColor = (status?: string): 'red' | 'yellow' | 'blue' => {
    switch ((status || '').toLowerCase()) {
      case 'open':
      case 'aberta':
      case 'pending':
        return 'red';
      case 'in_progress':
      case 'em andamento':
        return 'yellow';
      case 'resolved':
      case 'resolvida':
      case 'approved':
        return 'blue';
      case 'refused':
        return 'red';
      default:
        return 'blue';
    }
  };

  const getSeverityColor = (severity?: string): 'red' | 'yellow' | 'blue' => {
    switch ((severity || '').toLowerCase()) {
      case 'low':
        return 'blue';
      case 'medium':
        return 'yellow';
      case 'high':
        return 'red';
      default:
        return 'blue';
    }
  };

  return (
    <View className="flex-row flex-wrap gap-2 mb-4">
      {status && (
        <Tag
          label={`Status: ${translateStatus(status)}`}
          color={getStatusColor(status)}
        />
      )}
      {kind && (
        <Tag
          label={`Tipo: ${translateKind(kind)}`}
          color="yellow"
        />
      )}
      {severity && (
        <Tag
          label={`Gravidade: ${translateSeverity(severity)}`}
          color={getSeverityColor(severity)}
        />
      )}
    </View>
  );
}
