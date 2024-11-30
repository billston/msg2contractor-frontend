import Modal from '../Modal';
import ReceptorForm from '../ReceptorForm';
import { useReceptores } from '../../hooks/useReceptores';

interface CreateReceptorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateReceptorModal({ isOpen, onClose }: CreateReceptorModalProps) {
  const { createReceptor } = useReceptores();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nuevo Receptor"
    >
      <ReceptorForm
        onSubmit={async (data, firma) => {
          await createReceptor.mutateAsync({ data, firma });
          onClose();
        }}
        isSubmitting={createReceptor.isPending}
      />
    </Modal>
  );
}

export default CreateReceptorModal;