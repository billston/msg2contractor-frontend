import Modal from '../Modal';
import GrupoForm from '../GrupoForm';
import { useGrupos } from '../../hooks/useGrupos';
import { GrupoReceptor } from '../../types';

interface EditGrupoModalProps {
  grupo: GrupoReceptor | null;
  onClose: () => void;
}

function EditGrupoModal({ grupo, onClose }: EditGrupoModalProps) {
  const { updateGrupo } = useGrupos();

  if (!grupo) return null;

  return (
    <Modal
      isOpen={!!grupo}
      onClose={onClose}
      title="Editar Grupo"
    >
      <GrupoForm
        initialData={grupo}
        onSubmit={async (data) => {
          await updateGrupo.mutateAsync({
            id: grupo.idGrupoReceptor,
            data,
          });
          onClose();
        }}
        isSubmitting={updateGrupo.isPending}
      />
    </Modal>
  );
}

export default EditGrupoModal;