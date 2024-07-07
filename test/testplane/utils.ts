// Для проверки поменяй значение bugId, (null - запуск теста без багов)
const bugId = 10;
if (bugId !== null) {
    console.log('Тесты запущены с BUG_ID = ', bugId);
} else {
    console.log('Тесты запущены без BUG_ID');
}
export const addBugIdToUrl = (url, bug_id = bugId) => {
    return url + (bug_id === null ? '' : '?bug_id=' + bug_id);
};
