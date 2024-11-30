import Modal from '../Modal';
import ComunicadoForm from '../ComunicadoForm';
import { useComunicados } from '../../hooks/useComunicados';

interface CreateComunicadoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateComunicadoModal({ isOpen, onClose }: CreateComunicadoModalProps) {
  const { createComunicado } = useComunicados();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nuevo Comunicado"
    >
      <ComunicadoForm
        onSubmit={async (data, adjunto) => {
          await createComunicado.mutateAsync({ data, adjunto });
          onClose();
        }}
        isSubmitting={createComunicado.isPending}
      />
    </Modal>
  );
}

export default CreateComunicadoModal;