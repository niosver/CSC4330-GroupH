export const formatDate = (date: Date) => {
    const hours = date.getHours().toString();
    const _minutes = date.getMinutes();
    const minutes = _minutes < 10 ? '0' + _minutes : _minutes.toString();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${hours}:${minutes}`;
};
