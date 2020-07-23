import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';
import '@testing-library/jest-dom';

cloudinary.config({
	cloud_name: 'dvltylu92',
	api_key: '346332177514665',
	api_secret: 'ZMWgK-6K0p9dbLUw9_nMUa5a4No'
});

describe('Pruebas en fileUpload', () => {
	test('Debe cargar un archivo y retornar el URL ', async (done) => {
		const resp = await fetch(
			'https://images.mediotiempo.com/Dv5ZtqrtdHm5pn1DTlypGLqiWCE=/958x596/uploads/media/2020/03/19/one-piece-llegar-netflix-primeras.jpg'
		);
		const blob = await resp.blob();

		const file = new File([ blob ], 'foto.png');
		const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1 ].replace('.jpg', '');
        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done();
        });
	});

	test('Debe retornar un error', async () => {
		const file = new File([], 'foto.png');
		const url = await fileUpload(file);
		expect(url).toBeFalsy();
	});
});
