const BufferResult = ({ buffer, success, delItems }) => success
    ? <li className={`dark:text-green-400 text-green-600 md:text-base xl:text-xl list-disc`}>{`El buffer ${buffer} se limpio correctamente y se borraron ${delItems} items.`}</li>
    : <li className={`dark:text-red-400 text-red-600 md:text-base xl:text-xl list-disc`}>{`La limpieza del buffer ${buffer} falló.`}</li>

export default BufferResult