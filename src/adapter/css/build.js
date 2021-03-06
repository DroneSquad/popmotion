import transformProps from './transform-props';
import prefixer from './prefixer';
import { camelToDash } from '../../inc/utils';

const TRANSLATE_Z = 'translateZ';

export default (state, disableHardwareAcceleration) => {
    let propertyString = '';
    let transformString = '';
    let transformHasZ = false;

    for (let key in state) {
        if (state.hasOwnProperty(key)) {
            const value = state[key];

            if (transformProps[key]) {
                transformString += key + '(' + value + ') ';
                transformHasZ = (key === TRANSLATE_Z) ? true : transformHasZ;

            } else {
                propertyString += ';' + prefixer(camelToDash(key)) + ':' + value;
            }
        }
    }

    if (transformString !== '') {
        if (!transformHasZ && !disableHardwareAcceleration) {
            transformString += TRANSLATE_Z + '(0px)';
        }

        propertyString += ';' + prefixer('transform') + ':' + transformString;
    }

    return propertyString;
};