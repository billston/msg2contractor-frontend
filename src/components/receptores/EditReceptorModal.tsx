import Modal from '../Modal';
import ReceptorForm from '../ReceptorForm';
import { useReceptores } from '../../hooks/useReceptores';
import { Receptor } from '../../types';

interface EditReceptorModalProps {
  receptor: Receptor | null;
  onClose: () => void;
}

function EditReceptorModal({ receptor, onClose }: EditReceptorModalProps) {
  const { updateReceptor } = useReceptores();

  if (!receptor) return null;

  return (
    <Modal
      isOpen={!!receptor}
      onClose={onClose}
      title="Editar Receptor"
    >
      <ReceptorForm
        initialData={receptor}
        onSubmit={async (data, firma) => {
          await updateReceptor.mutateAsync({
            id: receptor.idReceptor,
            data,
            firma,
          });
          onClose();
        }}
        isSubmitting={updateReceptor.isPending}
      />
    </Modal>
  );
}

export default EditReceptorModal;