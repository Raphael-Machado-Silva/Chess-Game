import { useAppContext }from '../../../contexts/Context'
import { takeBack } from '../../../reducer/actions/move';
import './TakeBack.css'

const TakeBack = () => {

    const { dispatch } = useAppContext();

    return <div>
            <div className="box-2">
                 <div className="btn btn-two" >
                    <span onClick={() => dispatch(takeBack())}>VOLTAR</span>
                 </div>
             </div>
    </div>
}

export default TakeBack