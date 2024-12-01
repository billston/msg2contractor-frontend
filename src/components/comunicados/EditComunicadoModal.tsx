import Modal from '../Modal';
import ComunicadoForm from '../ComunicadoForm';
import { useComunicados } from '../../hooks/useComunicados';
import { Comunicado } from '../../types';

interface EditComunicadoModalProps {
  comunicado: Comunicado | null;
  onClose: () => void;
}

function EditComunicadoModal({ comunicado, onClose }: EditComunicadoModalProps) {
  const { updateComunicado } = useComunicados();

  if (!comunicado) return null;

  return (
    <Modal
      isOpen={!!comunicado}
      onClose={onClose}
      title="Editar Comunicado"
      size="large"
    >
      <ComunicadoForm
        initialData={comunicado}
        onSubmit={async (data, adjunto) => {
          await updateComunicado.mutateAsync({
            id: comunicado.idComunicado,
            data,
            adjunto,
          });
          onClose();
        }}
        isSubmitting={updateComunicado.isPending}
      />
    </Modal>
  );
}

export default EditComunicadoModal;