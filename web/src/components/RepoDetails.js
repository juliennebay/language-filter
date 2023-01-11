import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Modal from 'react-modal';

function RepoDetails({ commitUrl, fullName, showModal, closeModal }) {
  const [author, setAuthor] = useState([]);
  const [commitDate, setCommitDate] = useState([]);
  const [commitMessage, setCommitMessage] = useState([]);
  const [readMe, setReadMe] = useState('');

  useEffect(() => {
    const dataFetch = async () => {
      if (!commitUrl) {
        return;
      }
      const res = await (await fetch(commitUrl)).json();
      const commit = res.sort((a, b) =>
        b.commit.author.date > a.commit.author.date
          ? 1
          : b.commit.author.date > a.commit.author.date
          ? -1
          : 0
      )[0].commit;

      setAuthor(commit.author.name);
      setCommitDate(commit.author.date);
      setCommitMessage(commit.message);
    };
    dataFetch();
  }, [commitUrl]);

  //readME
  useEffect(() => {
    if (!fullName) {
      return;
    }
    fetch(`https://raw.githubusercontent.com/${fullName}/master/README.md`)
      .then((res) => res.text())
      .then((result) => {
        setReadMe(result);
      });
  }, [fullName]);

  return (
    <Modal isOpen={showModal}>
      <button onClick={closeModal}>close</button>
      <div>Author: {author}</div>
      <div>Commit date: {commitDate}</div>
      <div>Message: {commitMessage}</div>
      <div>ReadMe: </div>
      <ReactMarkdown children={readMe} />
    </Modal>
  );
}

export default RepoDetails;
