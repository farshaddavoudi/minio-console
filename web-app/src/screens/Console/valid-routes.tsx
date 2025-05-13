//  This file is part of MinIO Console Server
//  Copyright (c) 2022 MinIO, Inc.
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU Affero General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU Affero General Public License for more details.
//
//  You should have received a copy of the GNU Affero General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React from "react";
import { IMenuItem } from "./Menu/types";
import {
  adminUserPermissions,
  CONSOLE_UI_RESOURCE,
  IAM_PAGES,
  IAM_PAGES_PERMISSIONS,
  IAM_SCOPES,
  S3_ALL_RESOURCES,
} from "../../common/SecureComponent/permissions";
import {
  AccessMenuIcon,
  AccountsMenuIcon,
  AuditLogsMenuIcon,
  BucketsMenuIcon,
  DocumentationIcon,
  GroupsMenuIcon,
  IdentityMenuIcon,
  LambdaIcon,
  LicenseIcon,
  LockOpenIcon,
  LoginIcon,
  LogsMenuIcon,
  MetricsMenuIcon,
  MonitoringMenuIcon,
  ObjectBrowserIcon,
  SettingsIcon,
  UsersMenuIcon,
} from "mds";
import { hasPermission } from "../../common/SecureComponent";
import EncryptionIcon from "../../icons/SidebarMenus/EncryptionIcon";
import EncryptionStatusIcon from "../../icons/SidebarMenus/EncryptionStatusIcon";

const permissionsValidation = (item: IMenuItem) => {
  return (
    ((item.customPermissionFnc
      ? item.customPermissionFnc()
      : hasPermission(
          CONSOLE_UI_RESOURCE,
          IAM_PAGES_PERMISSIONS[item.path ?? ""],
        )) ||
      item.forceDisplay) &&
    !item.fsHidden
  );
};

const validateItem = (item: IMenuItem) => {
  // We clean up child items first
  if (item.children && item.children.length > 0) {
    const childArray: IMenuItem[] = item.children.reduce(
      (acc: IMenuItem[], item) => {
        if (!validateItem(item)) {
          return [...acc];
        }

        return [...acc, item];
      },
      [],
    );

    const ret = { ...item, children: childArray };

    return ret;
  }

  if (permissionsValidation(item)) {
    return item;
  }

  return false;
};

export const validRoutes = (
  features: string[] | null | undefined,
  licenseNotification: boolean = false,
) => {
  const ldapIsEnabled = (features && features.includes("ldap-idp")) || false;
  const kmsIsEnabled = (features && features.includes("kms")) || false;

  let consoleMenus: IMenuItem[] = [
    {
      group: "User",
      name: "Object Browser",
      id: "object-browser",
      path: IAM_PAGES.OBJECT_BROWSER_VIEW,
      icon: <ObjectBrowserIcon />,
      forceDisplay: true,
    }
  ];

  return consoleMenus.reduce((acc: IMenuItem[], item) => {
    const validation = validateItem(item);
    if (!validation) {
      return [...acc];
    }

    return [...acc, validation];
  }, []);
};
