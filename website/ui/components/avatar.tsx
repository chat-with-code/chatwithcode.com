import { ReactElement } from 'react';
import ReactAvatar from 'react-avatar';

export const Avatar = ({
  author,
}: {
  author: { name: string; github?: string; twitter?: string };
}): ReactElement => {
  return (
    <ReactAvatar
      round
      githubHandle="github.com"
      twitterHandle="twitter.com"
      size="40"
      title="test author"
      alt="test author"
    />
  );
};
