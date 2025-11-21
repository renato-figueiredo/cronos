import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { setupSwagger } from './config/swagger';
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

setupSwagger(app);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/users', userRoutes);

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Global Error Handler
app.use(errorHandler);

const PORT = env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;
