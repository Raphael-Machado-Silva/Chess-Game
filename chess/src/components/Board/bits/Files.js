const Files = ({ files }) => {
    return (
        <div className="files">
            {files.map((file) => (
                <div key={file} className="file">{file}</div>
            ))}
        </div>
    );
};

export default Files;
