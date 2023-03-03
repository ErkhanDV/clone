export interface ILogIn {
  userName: string;
  isAuthorized: boolean;
  isModalOpen: boolean;
  modalChildren: string;
  onlinePlayers: number;
  onlineNames: string[];
}
