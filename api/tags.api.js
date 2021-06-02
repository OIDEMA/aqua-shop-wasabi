import firebase from '@/plugins/firebase'
import 'firebase/firestore';

export async function fetchTags() {
  // return await firebase
  // .firestore()
  // .collection(`restaurants/${id}/admin`)
  return await AdminRef(id)
    .where('uid', '!=', uid)
    .get()
    .then((snapshots) => {
      return snapshots.docs.map((snapshot) => {
        if (snapshot.exists) {
          return Object.assign({ id: snapshot.id }, snapshot.data())
        }
      })
    })
    .catch((err) => {
      throw err
    })
}

export async function addUser(id, payload) {
  return await AdminRef(id)
    .add(payload)
    .catch((err) => {
      throw err
    })
}

export async function removeUser(restaurantDocId, adminDocId) {
  return await firebase
    .firestore()
    .doc(`restaurants/${restaurantDocId}/admin/${adminDocId}`)
    .delete()
    .catch((err) => {
      throw err
    })
}