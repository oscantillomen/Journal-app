import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewNote, startLoadingNotes, startSaveNote, startUploading } from '../../../redux/actions/notes';
import '@testing-library/jest-dom';
import { types } from '../../../redux/types/types';
import { db } from '../../../firebase/firebase-config';
import { fileUpload } from '../../../helpers/fileUpload';

jest.mock('../../../helpers/fileUpload', () => ({
	fileUpload: jest.fn(() => {
		return 'http://hola-mundo.com/picture.jpg'
	})
}))


const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {
	auth: {
		uid: 'testing_id'
	},
	notes: {
		active: {
			id: '21GxdUEmEBkqGHDFGgmb',
			title: 'Hola',
			body: 'Mundo'
		}
	}
};

let store = mockStore(initState);

describe('Pruebas con las acciones de notes', () => {
	beforeEach(() => {
		store = mockStore(initState);
	});

	test('Debe crear una nueva note startNewNote', async () => {
		await store.dispatch(startNewNote());
		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.notesActive,
			payload: {
				id: expect.any(String),
				title: '',
				body: '',
				date: expect.any(Number)
			}
		});

		expect(actions[1]).toEqual({
			type: types.notesAddNew,
			payload: {
				id: expect.any(String),
				title: '',
				body: '',
				date: expect.any(Number)
			}
		});

		const docId = actions[0].payload.id;
		await db.doc(`/testing_id/journal/notes/${docId}`).delete();
	});

	test('startLoadingNotes debe cargar las notas', async () => {
		await store.dispatch(startLoadingNotes('testing_id'));

		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: types.notesLoad,
			payload: expect.any(Array)
		});

		const expected = {
			id: expect.any(String),
			title: expect.any(String),
			body: expect.any(String),
			date: expect.any(Number)
		};

		expect(actions[0].payload[0]).toMatchObject(expected);
	});

	test('startSaveNote debe actualizar la nota', async () => {
		const note = {
			id: '21GxdUEmEBkqGHDFGgmb',
			title: 'titulo',
			body: 'body'
		};

		await store.dispatch(startSaveNote(note));

		const actions = store.getActions();
		expect(actions[0].type).toBe(types.notesUpdated);

		const docRef = await db.doc(`/testing_id/journal/notes/${note.id}`).get();
		expect(docRef.data().title).toBe(note.title);
	});

	test('startUploading debe actualizar el url del entry', async () => {
		const file = new File([], 'foto.jpg');
		await store.dispatch(startUploading(file));

		const docRef = await db.doc(`/testing_id/journal/notes/21GxdUEmEBkqGHDFGgmb`).get();

		expect( docRef.data().url ).toBe('http://hola-mundo.com/picture.jpg');
	});
});
