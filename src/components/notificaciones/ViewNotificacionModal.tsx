import Modal from '../Modal';
import { format } from 'date-fns';
import { Notificacion } from '../../types';

interface ViewNotificacionModalProps {
  notificacion: Notificacion | null;
  onClose: () => void;
}

function ViewNotificacionModal({ notificacion, onClose }: ViewNotificacionModalProps) {
  if (!notificacion) return null;

  return (
    <Modal
      isOpen={!!notificacion}
      onClose={onClose}
      title="Ver Notificación"
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {notificacion.comunicado?.asunto}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Enviado el{' '}
            {format(
              new Date(notificacion.fechaEmision),
              'dd/MM/yyyy HH:mm'
            )}
          </p>
        </div>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: notificacion.comunicado?.contenido || '',
          }}
        />
        {notificacion.respuesta && (
          <>
            <div className="border-t pt-4">
              <h4 className="text-md font-medium text-gray-900">Respuesta</h4>
              <p className="mt-1 text-sm text-gray-500">
                Respondido el{' '}
                {format(
                  new Date(notificacion.fechaRespuesta!),
                  'dd/MM/yyyy HH:mm'
                )}
              </p>
            </div>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: notificacion.respuesta,
              }}
            />
          </>
        )}
      </div>
    </Modal>
  );
}

export default ViewNotificacionModal;