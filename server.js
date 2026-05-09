require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Path = require('path');
const Nodemailer = require('nodemailer');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    await server.register(require('@hapi/inert'));

    const transporter = Nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT) || 587, // Перетворюємо рядок у число
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
}   );

    server.route({
        method: 'POST',
        path: '/api/contact',
        handler: async (request, h) => {
            const { name, email, telephone, message } = request.payload;

            if (!name || !email || !message) {
                return h.response({ message: 'Будь ласка, заповніть усі обов’язкові поля!' }).code(400);
            }

            try {
                await transporter.sendMail({
                    from: `"Мій Сайт" <anastasiia.panchyshyn.kb.2024@lpnu.ua>`,
                    to: 'anastasiia.panchyshyn.kb.2024@lpnu.ua', 
                    subject: `Нове повідомлення від ${name}`,
                    text: `Ім'я: ${name}\nEmail: ${email}\nТелефон: ${telephone}\nПовідомлення: ${message}`
                });

                return h.response({ message: 'Лист успішно надіслано!' }).code(200);
            } catch (error) {
                console.error(error);
                return h.response({ message: 'Помилка при відправці пошти' }).code(500);
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                index: 'index.html'
            }
        }
    });

    await server.start();
    console.log('console.log(ПЕРЕВІРКА ВЕРСІЇ №2);');
};

init();