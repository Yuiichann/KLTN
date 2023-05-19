import { IconType } from 'react-icons';
import { FaUserFriends } from 'react-icons/fa';
import { ImUserCheck } from 'react-icons/im';
import {
  MdAreaChart,
  MdOutlineList,
  MdPlaylistAddCheckCircle,
  MdRealEstateAgent,
  MdReport,
  MdSpaceDashboard,
} from 'react-icons/md';
import { RiUserSettingsFill } from 'react-icons/ri';

interface ISideBarConstant {
  label: string;
  icon: IconType;
  path: string;
  children?: ISideBarConstant[];
}

const SidebarConstants: ISideBarConstant[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: MdSpaceDashboard,
  },

  {
    label: 'Bất động sản',
    path: '/',
    icon: MdRealEstateAgent,
    children: [
      {
        label: 'Danh sách BĐS',
        path: '/quan-ly-bat-dong-san/danh-sach',
        icon: MdOutlineList,
      },

      // {
      //   label: 'Chờ duyệt',
      //   path: '/quan-ly-bat-dong-san/cho-duyet',
      //   icon: MdPlaylistAddCheckCircle,
      // },

      {
        path: '/quan-ly-bat-dong-san/bao-cao',
        label: 'Báo cáo',
        icon: MdReport,
      },
    ],
  },

  {
    label: 'Người dùng',
    path: '/',
    icon: RiUserSettingsFill,
    children: [
      {
        label: 'Danh sách users',
        icon: FaUserFriends,
        path: '/quan-ly-nguoi-dung/danh-sach',
      },
    ],
  },
];

export default SidebarConstants;
