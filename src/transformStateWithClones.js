'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state }; // Створюємо копію початкового стану
  const history = []; // Масив для збереження станів після кожної дії

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {}; // Очищаємо стан
    } else if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData }; // Додаємо нові властивості
    } else if (action.type === 'removeProperties') {
      currentState = { ...currentState }; // Копіюємо стан перед змінами
      for (const key of action.keysToRemove) {
        delete currentState[key]; // Видаляємо вказані ключі
      }
    }
    history.push({ ...currentState }); // Додаємо копію поточного стану в історію
  }
  
  return history;
}

module.exports = transformStateWithClones;
