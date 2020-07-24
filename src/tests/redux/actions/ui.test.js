const { setError, removeError, finishLoading, startLoading } = require("../../../redux/actions/ui");
const { types } = require("../../../redux/types/types");

describe('Pruebas en ui-actions', () => {
    test('Todas las acciones deben funcionar', () => {
        const errorText = "Help!!!"
        const action = setError(errorText);

        expect( action).toEqual({
            type: types.uiSetError,
            payload: errorText
        });

        const removeErrorAction = removeError();
        const finishLoadingAction = finishLoading();
        const startLoadingAction = startLoading();

        expect(removeErrorAction).toEqual({
            type: types.uiRemoveError
        });

        expect(finishLoadingAction).toEqual({
            type: types.uiFinishLoading
        });

        expect(startLoadingAction).toEqual({ 
            type: types.uiStartLoading
        });
    });
})
