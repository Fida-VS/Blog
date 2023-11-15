import { ROLE } from "../../constants/role";
import { getRoles } from "../api";
import { sessions } from '../sessions';

export const fetchRoles = async(hash) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles)

	if (!access) {
		return {
			error: 'Доступ запрещён',
			res: null,
		};
	}

	const roles = await getRoles();

	return {
		error: null,
		res: roles,
	};
};
