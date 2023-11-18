import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "../../../../components";
import { CLOSE_MODAL, openModal, removePostAsync } from "../../../../actions";
import { useServerRequest } from "../../../../hooks";


const SpecialPanelContainer = ({className, id, publishedAt, editButton}) => {

const dispatch = useDispatch();
const navigate = useNavigate();
const requestServer = useServerRequest();


	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, id)).then(() => {
						navigate('/');
					});
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};



	return (
		<div className={className}>
				<div className="published-at">
					{ publishedAt && <Icon inactive={true} id="fa-calendar" margin="0 7px 0 0" size="18px" />}
					{publishedAt}
				</div>
				<div className="buttons">
				{editButton}
				{ publishedAt && <Icon id="fa-trash" size="20px" margin="0 0 0 7px" onClick={() => onPostRemove(id)} />}
				</div>
			</div>
	);
};


export const SpecialPanel = styled(SpecialPanelContainer)`
		display: flex;
		justify-content: space-between;
		margin: ${({margin}) => margin};

		& .published-at {
			display: flex;
			font-size: 18px;
		}

		& .buttons {
			display: flex;
		}

		& i {
			position: relative;
			top: -1px;
		}
`;