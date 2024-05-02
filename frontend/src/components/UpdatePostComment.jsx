import { Button, TextInput, Textarea } from 'flowbite-react';
import React from 'react';

const UpdatePostComment = ({
  setUpdateComment,
  comment,
  handleOnCommentChange,
  handleOnCommentSubmit,
}) => {
  return (
    <form onSubmit={(e) => handleOnCommentSubmit(e, comment._id)}>
      <Textarea
        onChange={handleOnCommentChange}
        className='overflow-y-scroll md:mx-auto p-3 scrollbar scrollbar-thumb-slate-300 dark:scrollbar-thumb-state-700'
        defaultValue={comment.content}
      />
      <div className='flex gap-3 mt-3 justify-end'>
        <Button type='submit' gradientDuoTone='purpleToBlue'>
          Save
        </Button>
        <Button
          onClick={() => setUpdateComment(false)}
          gradientDuoTone='purpleToBlue'
          outline
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default UpdatePostComment;
