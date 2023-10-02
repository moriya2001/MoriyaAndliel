import image1 from "../images/1.png";
import image2 from '../images/2.png';
import image3 from '../images/3.png';
import image4 from '../images/4.png';
import image5 from '../images/5.jpg';

export const HEADERS = [
        "סוג התנדבות",
        "תאריך התחלה",
        "שעת התחלה",
        "תאריך סיום",
        "שעת סיום",
        "עיר",
        "רחוב",
        "תאור",
        "מחיקה",
        "עריכה",
    ],
    MAX_DESCRIPTION_LEN = 50,
    DATE_FORMATE = 'DD-MM-YYYY HH:mm',
    AGE_OPTIONS = [
        {label: 'כל הגילאים', value: 'all'},
        {label: '18-30', value: '18-30'},
        {label: '31-40', value: '31-40'},
        {label: '41-50', value: '41-50'},
    ],

    GENDER_OPTIONS = [
        {label: 'כל המינים', value: 'all'},
        {label: 'גבר', value: 'male'},
        {label: 'אישה', value: 'female'},
    ],
    STATUSES = {
        approved: 3,
        rejected: 2,
        pending: 1,
    },
    DEFAULT_VALUE = '-1',

    DEFAULT_FILTERS = {
        type: DEFAULT_VALUE,
        city: DEFAULT_VALUE,
        startDate: DEFAULT_VALUE,
        endDate: DEFAULT_VALUE
    },

    IMAGES_TYPES = {
        'ילדים': image1,
        'מבוגרים': image2,
        'תנו לחיות לחיות': image3,
        'חלוקת מזון': image4,
        'רפואה': image5
    },
    APPROVED_STATUS = 3,
    REJECTED_STATUS = 2,
    EMAIL_SERVICE_ID = 'service_7rzvtwg',
    EMAIL_TEMPLATE_ID = 'approve_email',
    EMAIL_USER_ID = 'cubY8Y-jimY937YfV',
    FETCH_ERROR =
        'An error occurred while fetching the pending users. Please try again later.',
    UPDATE_ERROR =
        'An error occurred while updating the status. Please try again later.',
    APPROVED_SUCCESSFULLY = 'המשתמש אושר בהצלחה';