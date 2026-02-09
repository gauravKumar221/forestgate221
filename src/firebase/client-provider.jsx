'use client';

import { initializeFirebase } from '@/firebase/index';
import { FirebaseProvider } from '@/firebase/provider';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

// Note: This pattern is required for the Next.js App Router.
const { firebaseApp, auth, firestore } = initializeFirebase();

export function FirebaseClientProvider({
  children,
}) {
  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      auth={auth}
      firestore={firestore}
    >
      <FirebaseErrorListener />
      {children}
    </FirebaseProvider>
  );
}
