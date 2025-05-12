import { IPermissionListObj } from "../models/types/user-permissions";

export const compareUserPermissionHandler = async (permissionObj: IPermissionListObj, path: string) => {
    let returnData = false;

    const allPermissions = permissionObj.modulePermission.split("").map((value) => parseInt(value));

    if (
        (path.includes("/get-list") && allPermissions[1] === 1) ||
        (path.includes("/get") && allPermissions[1] === 1) ||
        (path.includes("/add-user") && allPermissions[0] === 1) ||
        (path.includes("/update") && allPermissions[2] === 1) ||
        (path.includes("/delete") && allPermissions[3] === 1) ||
        (path.includes("/get-permissions") && allPermissions[4] === 1) ||
        (path.includes("/update-permissions") && allPermissions[4] === 1)
    ) {
        returnData = true;
    }

    return returnData;
};