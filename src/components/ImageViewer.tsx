import { useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import { SceneMedia } from './SceneMedia';

export function ImageViewer({ id, label }: { id: string; label: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="viewer-trigger"
        ref={trigger}
        aria-label="查看大图"
        aria-haspopup="dialog"
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
      >
        <Maximize2 size={17} aria-hidden="true" />
      </button>
      <dialog
        className="image-viewer"
        ref={dialog}
        aria-label={label}
        onClose={() => {
          setOpen(false);
          trigger.current?.focus({ preventScroll: true });
        }}
      >
        <div className="viewer-layout">
          <div className="viewer-toolbar">
            <p>{label}</p>
            <button
              type="button"
              autoFocus
              className="viewer-trigger"
              aria-label="关闭大图"
              onClick={() => dialog.current?.close()}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <div className="viewer-image">{open && <SceneMedia id={id} priority sizes="94vw" />}</div>
        </div>
      </dialog>
    </>
  );
}
