import styles from "./NotFoundBlock.module.scss";

function NotFoundBlock() {
    return (
        <div className={styles.root}>
            <h1>Error 404</h1>
            <h2>NotFound</h2>
        </div>

    )
}

export default NotFoundBlock