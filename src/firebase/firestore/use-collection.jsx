'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  onSnapshot,
  query,
  collection,
  orderBy,
} from 'firebase/firestore';
import { useFirestore } from '../provider';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';

export function useCollection(
  path,
  queryConstraints = []
) {
  const firestore = useFirestore();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const pathString = path;
  const constraintsString = queryConstraints.map(c => c.type).join(',');

  useEffect(() => {
    if (!firestore || !pathString) {
        setLoading(false);
        setData(null);
        return;
    };

    const collectionRef = collection(firestore, pathString);
    const q = query(collectionRef, ...queryConstraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() })
        );
        setData(docs);
        setLoading(false);
      },
      async (err) => {
        console.error(`Error fetching collection ${pathString}:`, err);
        const permissionError = new FirestorePermissionError({
          path: collectionRef.path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setLoading(false);
        setData(null);
      }
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firestore, pathString, constraintsString]);

  return { data, loading };
}
