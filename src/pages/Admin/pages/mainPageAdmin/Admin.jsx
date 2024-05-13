import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Admin.module.css';
import RegistExpert from '../../components/RegistExpert/RegistExpert';
import DeleteExpert from '../../components/DeleteExpert/DeleteExpert';
import RecordingButton from '../../components/RecordingButton/RecordingButton';
import { TotalCustomers } from '../../components/Statistics/TotalCustomers/TotalCustomers';
import { TasksProgress } from '../../components/Statistics/TotalProgress/TaskProgress';
import { TotalWords } from '../../components/Statistics/TotalWords/TotalWords';
import { TotalCorrectRecordings } from '../../components/Statistics/TotalCorrectRecordings/TotalCorrectRecordings';
import RatingWords from '../../components/RatingWords/RatingWords';

const Admin = () => {
    const [stats, setStats] = useState({
        customers: {},
        taskProgress: {},
        totalWords: {},
        correctRecordings: {}
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://your-api-url.com/stats'); // Adjust URL as needed
                setStats({
                    customers: response.data.customers,
                    taskProgress: response.data.taskProgress,
                    totalWords: response.data.totalWords,
                    correctRecordings: response.data.correctRecordings
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={classes.admin}>
            <div className={classes.statsContainer}>
                <TotalCustomers data={stats.customers} />
                <TasksProgress data={stats.taskProgress} />
                <TotalWords data={stats.totalWords} />
                <TotalCorrectRecordings data={stats.correctRecordings} />
            </div>
            <div className={classes.formContainer}>
                <RegistExpert classes={classes} />
                <DeleteExpert classes={classes} />
            </div>
            <RatingWords/>
            <RecordingButton />
        </div>
    );
}

export default Admin;
