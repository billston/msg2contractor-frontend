import Modal from '../Modal';
import ComunicadoForm from '../ComunicadoForm';
import { Comunicado } from '../../types';

interface ViewComunicadoModalProps {
  comunicado: Comunicado | null;
  onClose: () => void;
}

function ViewComunicadoModal({ comunicado, onClose }: ViewComunicadoModalProps) {
  if (!comunicado) return null;

  return (
    <Modal
      isOpen={!!comunicado}
      onClose={onClose}
      title="Ver Comunicado"
      size="large"
    >
      <ComunicadoForm initialData={comunicado} readOnly />
    </Modal>
  );
}

export default ViewComunicadoModal;