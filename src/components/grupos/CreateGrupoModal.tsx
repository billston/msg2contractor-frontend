import Modal from '../Modal';
import GrupoForm from '../GrupoForm';
import { useGrupos } from '../../hooks/useGrupos';

interface CreateGrupoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateGrupoModal({ isOpen, onClose }: CreateGrupoModalProps) {
  const { createGrupo } = useGrupos();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nuevo Grupo"
    >
      <GrupoForm
        onSubmit={async (data) => {
          await createGrupo.mutateAsync(data);
          onClose();
        }}
        isSubmitting={createGrupo.isPending}
      />
    </Modal>
  );
}

export default CreateGrupoModal;