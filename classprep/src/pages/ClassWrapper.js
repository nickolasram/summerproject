import { useParams } from 'react-router-dom';
import SingleClass from './SingleClass';

const ClassWrapper =()=> {
    const { title } = useParams();
    return <SingleClass title={title} />
}

export default ClassWrapper;