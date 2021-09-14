import React, { useRef, useState } from 'react';
import { Alert, Button, Modal } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
import { useModalState } from '../../misc/custom-hooks';
import { database, storage } from '../../misc/firebase';
import { useProfile } from '../../context/profile.context';
import ProfileAvatar from '../ProfileAvatar';
import { getUserUpdates } from '../../misc/helpers';

const fileInputTypes = '.png, .jpeg, .jpg';
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];
const isValidFile = file => acceptedFileTypes.includes(file.type);

const AvatarUploadBtn = () => {
  const { isOpen, open, close } = useModalState();
  const [img, setImg] = useState(null);
  const avatarEditorRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useProfile();

  const getBlob = canvas => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('File process error'));
        }
      });
    });
  };

  const onFileInputChange = ev => {
    const currFiles = ev.target.files;
    if (currFiles.length === 1) {
      const file = currFiles[0];
      if (isValidFile(file)) {
        setImg(file);
        open();
      } else {
        Alert.warning(`Oh boy, you selected the wrong file type ${file.type}`);
      }
    }
  };
  const onUploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();

    setIsLoading(true);
    try {
      const blob = await getBlob(canvas);
      const avatarFileRef = storage
        .ref(`/profile/${profile.uid}`)
        .child('avatar');
      const uploadAvatarRefult = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });
      const downloadURL = await uploadAvatarRefult.ref.getDownloadURL();

      const updates = await getUserUpdates(
        profile.uid,
        'avatar',
        downloadURL,
        database
      );
      await database.ref().update(updates);

      Alert.info('Avatar has been uploaded', 4000);
      setIsLoading(false);
    } catch (err) {
      Alert.error(err.message, 4000);
      setIsLoading(false);
    }
  };
  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={profile.avatar}
        name={profile.name}
        className="width-200 height-200 img-fullsize font-huge"
      />
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select new Avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>
        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and Upload your new Avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {img && (
              <div className="d-flex justify-content-center align-items-center h-100">
                <AvatarEditor
                  ref={avatarEditorRef}
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              appearance="ghost"
              block
              onClick={onUploadClick}
              disabled={isLoading}
            >
              Upload Avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadBtn;
