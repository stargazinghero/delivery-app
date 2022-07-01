import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

import { DatabaseProvider, AuthProvider, useFirebaseApp } from 'reactfire';

import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';

function FirebaseComponents({ children }) {
    const app = useFirebaseApp();
    const database = getDatabase(app);
    const auth = getAuth(app);

    return (
        <AuthProvider sdk={auth}>
            <DatabaseProvider sdk={database}>{children}</DatabaseProvider>
        </AuthProvider>
    );
}

export default FirebaseComponents;
