export interface ApiResponse<T = null, U = never> {
  /**
   * @description Response data
   */
  payload: T;

  /**
   * @description Request ID
   */
  requestId: string;

  /**
   * @description Response errors
   */
  errors?: U[];

  /**
   * @description Response message
   */
  message?: string;
}
