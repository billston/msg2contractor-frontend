import Modal from '../Modal';
import RespuestaForm from '../RespuestaForm';
import { useNotificaciones } from '../../hooks/useNotificaciones';
import { Notificacion } from '../../types';

interface RespuestaModalProps {
  notificacion: Notificacion | null;
  isOpen: boolean;
  onClose: () => void;
}

function RespuestaModal({ notificacion, isOpen, onClose }: RespuestaModalProps) {
  const { responderNotificacion } = useNotificaciones();

  if (!notificacion) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Responder Notificación"
    >
      <RespuestaForm
        onSubmit={async (data, adjunto) => {
          await responderNotificacion.mutateAsync({
            id: notificacion.idNotificacion,
            data,
            adjunto,
          });
          onClose();
        }}
        isSubmitting={responderNotificacion.isPending}
      />
    </Modal>
  );
}

export default RespuestaModal;