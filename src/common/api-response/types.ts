export interface ApiResponse<T = null, U = never> {
  /**
   * @description Response data
   */
  payload: T;

  /**
   * @description Response errors
   */
  errors?: U[];

  /**
   * @description Request ID
   */
  requestId: string;
}
