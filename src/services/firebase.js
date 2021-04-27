import { firebase, FieldValue } from "../lib/firebase";

export const doesUsernameExist = async (userName) => {
  const username = userName.toLowerCase();
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
};

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}

export const getUserFollowedPhotos = async (userId, followingUserIds) => {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", followingUserIds)
    .get();

  const userFollowedPhotos = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const username = user[0].username;
      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
};

export const getSuggestedProfiles = async (userId) => {
  //getting all users limiting to 10
  const result = await firebase.firestore().collection("users").limit(10).get();

  //get only the current user and get the people they are following
  const [{ following: userFollowing = [] }] = await getUserByUserId(userId);

  // get all users that are not in the userFollowing array.
  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !userFollowing.includes(profile.userId)
    );
};

export async function updateUserFollowing(
  docId,
  profileId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(docId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

export async function updateFollowedUserFollowers(
  docId,
  followingUserId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(docId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(followingUserId)
        : FieldValue.arrayUnion(followingUserId),
    });
}

export const getUserByUsername = async (username) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user.length > 0 ? user : false;
};

export const getUserPhotosByUsername = async (username) => {
  const [{ ...user } = 0] = await getUserByUsername(username);

  const response = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", user.userId)
    .get();

  return response.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
};

export const toggleFollow = async (
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileId,
  followingUserId
) => {
  await updateUserFollowing(activeUserDocId, profileId, isFollowingProfile);
  await updateFollowedUserFollowers(
    profileDocId,
    followingUserId,
    isFollowingProfile
  );
};

export const isUserFollowingProfile = async (activeUsername, profileUserId) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", activeUsername)
    .where("following", "array-contains", profileUserId)
    .get();

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return !!response.fullName;
};

export async function storeImage(reference, username, file) {
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const specificRef = storageRef.child(`${reference}/${username}.jpg`);

  specificRef.put(file, { contentType: "image/jpeg" });
}

export async function updateUserImage(docId, imageUrl) {
  return firebase.firestore().collection("users").doc(docId).update({
    imageSrc: imageUrl,
  });
}
