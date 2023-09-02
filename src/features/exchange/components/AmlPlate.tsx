import styles from "./AmlPlate.module.scss";

const AmlPlate = () => {
  return (
    <div className={styles["aml-plate"]}>
      <div className={styles["aml-plate__header"]}>
        <div className={styles["aml-plate__icon"]}>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="17" cy="17" r="16" stroke="#287AD8" strokeWidth="2"></circle>
            <path d="M8.44027 14.3131L6.4081 20.1875H4.25L7.31256 12.75H8.68069L8.44027 14.3131ZM10.1232 20.1875L8.08535 14.3131L7.82203 12.75H9.20734L12.2871 20.1875H10.1232ZM10.0431 17.4138V18.7981H5.76697V17.4138H10.0431Z" fill="#287AD8"></path>
            <path d="M13.8956 12.75H15.5328L17.3932 17.9246L19.2537 12.75H20.8909L18.0573 20.1875H16.7292L13.8956 12.75ZM12.8996 12.75H14.594L14.9088 18.4507V20.1875H12.8996V12.75ZM20.1925 12.75H21.8926V20.1875H19.8776V18.4507L20.1925 12.75Z" fill="#287AD8"></path>
            <path d="M28.6875 18.8083V20.1875H24.4743V18.8083H28.6875ZM25.1899 12.75V20.1875H23.1806V12.75H25.1899Z" fill="#287AD8"></path>
          </svg>
        </div>
        <div className={styles["aml-plate__title"]}>
          <span className="translate-it">
            Мы можем проверять обмены в соответствии с <a href="#/kyt" target="_blank" rel="noopener noreferrer">AML/KYC политикой</a>.
          </span>
        </div>
      </div>
      <div className={styles["aml-plate__body"]}>
        В случае, если транзакция будет идентифицирована как рисковая, мы можем приостановить операцию обмена и попросить пройти процедуру идентификации.
      </div>
    </div>
  );
}

export default AmlPlate;
