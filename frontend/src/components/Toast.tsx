import { useEffect } from "react";

type ToastProps = {
    message: string;
    type: 'SUCCESS' | 'ERROR';
    onClose: () => void;
}

const Toast = ({message,type,onClose}: ToastProps) => {

    // Таймер на то что окно с содержимым текстом пропадет через 5 секунд
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        // Тут мы выставялем что при *УДАЧНОЙ* решистрации и *НЕУДАЧНОЙ*.
        return () => {
            clearTimeout(timer);
        };
    }, [onClose])
    const styles = type === 'SUCCESS' ? 'fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md' : 'fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md'
  // Тут хранится само окно где оно будет расположено, с содержимым {message}
  return (
<div className={styles}>
    <div className="flex justify-center items-center">
        <span className="text-lg font-semihold">{message}</span>
    </div>
</div>
  )
}

export default Toast