/*export const fileUpload = (req, res) => {
    try {
        const jsonData = req.body;
        const image = req.file;

        const mimetypeExxcel = 'application/vnd.ms-excel';

        if (!image) {
            return res.status(400).json({
                ok: false,
                message: 'Archivo o imagen requerido!'
            });
        };

        var dir = ROOT_PUBLIC_DIR + '/users' + '/'  + '/img';
        var files = ROOT_PUBLIC_DIR + `/users/${jsonData}/img/`;

        if (image.mimetype == mimetypeExxcel) {
            dir = ROOT_PUBLIC_DIR + '/users' + '/' + '/files';
            files = ROOT_PUBLIC_DIR + `/users/${jsonData}/files/`;
        }

        fs.mkdirSync(dir, { recursive: true });

        let image_new_name = null;
        const uuid = uuidv4().toUpperCase();

        if (image) {
            fs.mkdirSync(path.join(files), { recursive: true });
            image_new_name = uuid + "." + (image.originalname).slice((Math.max(0, (image.originalname).lastIndexOf(".")) || Infinity) + 1);
            let direc = './media/temp_dir/';
            fs.renameSync(image.path, files + image_new_name);
        }

        return res.status(200).json({
            ok: true,
            url: `${BASE_URL}/public/users/${jsonData}/img/${image_new_name}`,
            img: image
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            code: error.code,
            message: error.message,
            a:'aaaaaaaaaa'
        });
    }
}*/