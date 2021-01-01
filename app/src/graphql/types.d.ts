import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: string;
  /** 正の整数 */
  PositiveNumber: number;
  /** Table id, hex Timestamp, ID */
  TTID: string;
};

/** Autogenerated input type of AddPlaylistItems */
export type AddPlaylistItemsInput = {
  /** プレイリストID */
  readonly playlistId: Scalars["TTID"];
  /** 追加したい曲ID */
  readonly trackIds: ReadonlyArray<Scalars["TTID"]>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of AddPlaylistItems */
export type AddPlaylistItemsPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly error: Maybe<Scalars["String"]>;
  /** 曲追加されたプレイリスト */
  readonly playlist: Maybe<Playlist>;
};

/** アルバム */
export type Album = {
  /** Apple Music アルバム */
  readonly appleMusicAlbum: Maybe<AppleMusicAlbum>;
  /** 大型アートワーク */
  readonly artworkL: Artwork;
  /** 中型アートワーク */
  readonly artworkM: Artwork;
  /** コピーライト */
  readonly copyright: Scalars["String"];
  /** 追加日 */
  readonly createdAt: Scalars["ISO8601DateTime"];
  /** ID */
  readonly id: Scalars["TTID"];
  /** iTunes アルバム */
  readonly itunesAlbum: Maybe<AppleMusicAlbum>;
  /** タイトル */
  readonly name: Scalars["String"];
  /** レーベル */
  readonly recordLabel: Scalars["String"];
  /** 発売日 */
  readonly releaseDate: Scalars["ISO8601DateTime"];
  /** Spotify アルバム */
  readonly spotifyAlbum: Maybe<SpotifyAlbum>;
  /** ステータス */
  readonly status: StatusEnum;
  /** トラック数 */
  readonly totalTracks: Scalars["PositiveNumber"];
  /** トラック */
  readonly tracks: ReadonlyArray<Track>;
};

export type AlbumsConditionsInputObject = {
  /** ユーザー名 */
  readonly usernames: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** アーティストID */
  readonly artists: Maybe<IdInputObject>;
  /** トラックID */
  readonly tracks: Maybe<IdInputObject>;
  /** アルバム名(あいまい検索) */
  readonly name: Maybe<Scalars["String"]>;
  /** 表示ステータス */
  readonly status: Maybe<ReadonlyArray<StatusEnum>>;
  /** お気に入り */
  readonly favorite: Maybe<Scalars["Boolean"]>;
};

export type AlbumsQueryOrderEnum =
  /** 追加順 */
  | "NEW"
  /** 発売日順 */
  | "RELEASE"
  /** 人気順 */
  | "POPULARITY";

export type AlbumsSortInputObject = {
  /** 並び順対象 */
  readonly order: Maybe<AlbumsQueryOrderEnum>;
  /** 並び順 */
  readonly type: Maybe<SortEnum>;
};

/** Apple Music アルバム */
export type AppleMusicAlbum = {
  /** Apple Music ID */
  readonly appleMusicId: Scalars["String"];
  /** ID */
  readonly id: Scalars["TTID"];
  /** タイトル */
  readonly name: Scalars["String"];
};

/** Apple Music アーティスト */
export type AppleMusicArtist = {
  /** Apple Music ID */
  readonly appleMusicId: Scalars["String"];
  /** ID */
  readonly id: Scalars["TTID"];
  /** 名前 */
  readonly name: Scalars["String"];
};

/** Apple Music トラック */
export type AppleMusicTrack = {
  /** Apple Music ID */
  readonly appleMusicId: Scalars["String"];
  /** ID */
  readonly id: Scalars["TTID"];
  /** タイトル */
  readonly name: Scalars["String"];
};

/** アーティスト */
export type Artist = {
  /** 関連アルバム */
  readonly albums: Maybe<ReadonlyArray<Album>>;
  /** Apple Music アーティスト */
  readonly appleMusicArtists: Maybe<ReadonlyArray<AppleMusicArtist>>;
  /** 大型アートワーク */
  readonly artworkL: Artwork;
  /** 中型アートワーク */
  readonly artworkM: Artwork;
  /** 追加日 */
  readonly createdAt: Scalars["ISO8601DateTime"];
  /** ID */
  readonly id: Scalars["TTID"];
  /** 名前 */
  readonly name: Scalars["String"];
  /** 発売日 */
  readonly releaseDate: Scalars["ISO8601DateTime"];
  /** Spotify アーティスト */
  readonly spotifyArtists: Maybe<ReadonlyArray<SpotifyArtist>>;
  /** ステータス */
  readonly status: StatusEnum;
  /** 関連曲 */
  readonly tracks: Maybe<ReadonlyArray<Track>>;
};

export type ArtistsConditionsInputObject = {
  /** ユーザー名 */
  readonly usernames: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** アルバムID */
  readonly albums: Maybe<IdInputObject>;
  /** トラックID */
  readonly tracks: Maybe<IdInputObject>;
  /** アーティスト名(あいまい検索) */
  readonly name: Maybe<Scalars["String"]>;
  /** 表示ステータス */
  readonly status: Maybe<ReadonlyArray<StatusEnum>>;
  /** お気に入り */
  readonly favorite: Maybe<Scalars["Boolean"]>;
};

export type ArtistsQueryOrderEnum =
  /** 名前順 */
  | "NAME"
  /** 追加順 */
  | "NEW"
  /** 人気順 */
  | "POPULARITY";

export type ArtistsSortInputObject = {
  /** ソート対象 */
  readonly order: Maybe<ArtistsQueryOrderEnum>;
  /** 並び順 */
  readonly type: Maybe<SortEnum>;
};

/** アートワーク */
export type Artwork = {
  /** 高さ */
  readonly height: Maybe<Scalars["PositiveNumber"]>;
  /** URL */
  readonly url: Maybe<Scalars["String"]>;
  /** 幅 */
  readonly width: Maybe<Scalars["PositiveNumber"]>;
};

/** Autogenerated input type of ChangeFavorites */
export type ChangeFavoritesInput = {
  /** お気に入り変更したいアーティストID */
  readonly artistIds: Maybe<ReadonlyArray<Scalars["TTID"]>>;
  /** お気に入り変更したいアルバムID */
  readonly albumIds: Maybe<ReadonlyArray<Scalars["TTID"]>>;
  /** お気に入り変更したいトラックID */
  readonly trackIds: Maybe<ReadonlyArray<Scalars["TTID"]>>;
  /** true の場合は一括でお気に入り登録をする。false 場合は一括で解除する。 */
  readonly favorite: Scalars["Boolean"];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of ChangeFavorites */
export type ChangeFavoritesPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  /** 更新されたカレントユーザー */
  readonly currentUser: Maybe<CurrentUser>;
  readonly error: Maybe<Scalars["String"]>;
};

/** Autogenerated input type of ChangeStatus */
export type ChangeStatusInput = {
  /** 変更したいアーティストID */
  readonly artistId: Maybe<Scalars["TTID"]>;
  /** 変更したいアルバムID */
  readonly albumId: Maybe<Scalars["TTID"]>;
  /** 変更したいトラックID */
  readonly trackId: Maybe<Scalars["TTID"]>;
  /** 変更したいステータス */
  readonly status: StatusEnum;
  /** true の場合は関連のステータスは変更しない。デフォルトは false。アーティスト限定 */
  readonly only: Maybe<Scalars["Boolean"]>;
  /** true の場合は Twitter に投稿する。デフォルトは true */
  readonly tweet: Maybe<Scalars["Boolean"]>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of ChangeStatus */
export type ChangeStatusPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly error: Maybe<Scalars["String"]>;
  /** 変更されたステータスを持ったモデル */
  readonly model: Maybe<ModelHasStatusUnion>;
};

/** Autogenerated input type of ClearCache */
export type ClearCacheInput = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of ClearCache */
export type ClearCachePayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly error: Maybe<Scalars["String"]>;
  readonly results: Maybe<ReadonlyArray<Scalars["String"]>>;
};

/** Autogenerated input type of CompactAlbum */
export type CompactAlbumInput = {
  /** 統合後のアルバム名。 */
  readonly name: Scalars["String"];
  /** 統合したいアルバムID。Apple Music アルバムのみ統合される。指定した順番通りに統合する。 */
  readonly albumIdsForAppleMusic: Maybe<ReadonlyArray<Scalars["TTID"]>>;
  /** 統合したいアルバムID。Spotify アルバムのみ統合される。指定した順番通りに統合する。 */
  readonly albumIdsForSpotify: Maybe<ReadonlyArray<Scalars["TTID"]>>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of CompactAlbum */
export type CompactAlbumPayload = {
  /** 統合されたアルバム */
  readonly album: Maybe<Album>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly error: Maybe<Scalars["String"]>;
};

/** カレントユーザー */
export type CurrentUser = {
  /** お気に入り */
  readonly favorite: Favorite;
  /** ID */
  readonly id: Scalars["TTID"];
  /** 名前 */
  readonly name: Scalars["String"];
  /** 公開情報 */
  readonly publicInformations: ReadonlyArray<PublicInformation>;
  /** 登録済み */
  readonly registered: Scalars["Boolean"];
  /** ロール */
  readonly role: Role;
  /** ユーザー名 */
  readonly username: Scalars["String"];
  /** バージョンファイル */
  readonly version: Scalars["String"];
};

export type CursorInputObject = {
  readonly offset: Maybe<Scalars["Int"]>;
  readonly limit: Maybe<Scalars["PositiveNumber"]>;
};

/** お気に入り */
export type Favorite = {
  /** アルバムID */
  readonly albumIds: ReadonlyArray<Scalars["String"]>;
  /** アーティストID */
  readonly artistIds: ReadonlyArray<Scalars["String"]>;
  /** トラックID */
  readonly trackIds: ReadonlyArray<Scalars["String"]>;
};

/** Autogenerated input type of ForceIgnoreAlbum */
export type ForceIgnoreAlbumInput = {
  /** 除外コンテンツに登録したいアルバムID */
  readonly albumId: Scalars["TTID"];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of ForceIgnoreAlbum */
export type ForceIgnoreAlbumPayload = {
  /** 除外コンテンツに登録されたアルバム */
  readonly album: Maybe<Album>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly error: Maybe<Scalars["String"]>;
};

/** Autogenerated input type of GenerateSitemaps */
export type GenerateSitemapsInput = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of GenerateSitemaps */
export type GenerateSitemapsPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly error: Maybe<Scalars["String"]>;
  readonly results: Maybe<ReadonlyArray<Scalars["String"]>>;
};

export type IdInputObject = {
  /** ID */
  readonly id: Maybe<ReadonlyArray<Scalars["TTID"]>>;
};

/** Autogenerated input type of IgnoreAlbums */
export type IgnoreAlbumsInput = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of IgnoreAlbums */
export type IgnoreAlbumsPayload = {
  /** IGNOREされたアルバム */
  readonly albums: Maybe<ReadonlyArray<Album>>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly error: Maybe<Scalars["String"]>;
};

/** Autogenerated input type of IgnoreArtists */
export type IgnoreArtistsInput = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of IgnoreArtists */
export type IgnoreArtistsPayload = {
  /** IGNOREされたアーティスト */
  readonly artists: Maybe<ReadonlyArray<Artist>>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly error: Maybe<Scalars["String"]>;
};

/** Autogenerated input type of Login */
export type LoginInput = {
  readonly username: Scalars["String"];
  readonly password: Scalars["String"];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of Login */
export type LoginPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly currentUser: Maybe<CurrentUser>;
  readonly error: Maybe<Scalars["String"]>;
};

/** Autogenerated input type of Logout */
export type LogoutInput = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of Logout */
export type LogoutPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly currentUser: Maybe<CurrentUser>;
  readonly error: Maybe<Scalars["String"]>;
};

/** Autogenerated input type of MixAlbum */
export type MixAlbumInput = {
  /** 混合したいアルバムID */
  readonly albumIds: ReadonlyArray<Scalars["TTID"]>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of MixAlbum */
export type MixAlbumPayload = {
  /** 混合されたアルバム */
  readonly album: Maybe<Album>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly error: Maybe<Scalars["String"]>;
};

/** Autogenerated input type of MixArtist */
export type MixArtistInput = {
  /** メインアーティストID */
  readonly mainArtistId: Scalars["TTID"];
  /** サブアーティストID */
  readonly subArtistId: Scalars["TTID"];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of MixArtist */
export type MixArtistPayload = {
  /** 混合されたアーティスト */
  readonly artist: Maybe<Artist>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly error: Maybe<Scalars["String"]>;
};

/** ステータスをもつモデルのいずれか */
export type ModelHasStatusUnion = Album | Artist | Track;

export type Mutation = {
  /** プレイリストに曲を追加する */
  readonly addPlaylistItems: Maybe<AddPlaylistItemsPayload>;
  /** お気に入り一括変更 */
  readonly changeFavorites: Maybe<ChangeFavoritesPayload>;
  /** ステータス変更。関連するアルバム, トラック, 各音楽サービスアルバム、各音楽サービストラックも同じステータスで更新される。 */
  readonly changeStatus: Maybe<ChangeStatusPayload>;
  /** 検索結果キャッシュをリセットする */
  readonly clearCache: Maybe<ClearCachePayload>;
  /** 複数アルバムを単一アルバムに統合する。統合前の複数アルバムは全て IGNORE される。 */
  readonly compactAlbum: Maybe<CompactAlbumPayload>;
  /** 対象アルバムを除外コンテンツに登録する */
  readonly forceIgnoreAlbum: Maybe<ForceIgnoreAlbumPayload>;
  /** サイトマップを更新する */
  readonly generateSitemaps: Maybe<GenerateSitemapsPayload>;
  /** PENDING状態のアルバム全てをIGNOREにする。よく考えてから実行すること。 */
  readonly ignoreAlbums: Maybe<IgnoreAlbumsPayload>;
  /** PENDING状態のアーティスト全てをIGNOREにする。よく考えてから実行すること。 */
  readonly ignoreArtists: Maybe<IgnoreArtistsPayload>;
  /** ログイン */
  readonly login: Maybe<LoginPayload>;
  /** ログアウト */
  readonly logout: Maybe<LogoutPayload>;
  /**
   * アルバムを混合する。
   * 同じアルバムのはずが各音楽サービスで別のアルバムと認識される場合がある。
   * その場合に使用する。曲数が多いアルバムを正とする。
   */
  readonly mixAlbum: Maybe<MixAlbumPayload>;
  /**
   * アーティストを混合する。
   * 混合後は修正不可のため注意して使用すること。
   */
  readonly mixArtist: Maybe<MixArtistPayload>;
  /** サインアップ */
  readonly signup: Maybe<SignupPayload>;
  /** 統合したアルバムを元に戻す。統合された単一アルバムは削除される。 */
  readonly uncompactAlbum: Maybe<UncompactAlbumPayload>;
  /** アルバムの混合を解除する。アルバムと曲数に相違がある音楽サービスアルバムを分離する。 */
  readonly unmixAlbum: Maybe<UnmixAlbumPayload>;
  /** カレントユーザー情報更新 */
  readonly updateMe: Maybe<UpdateMePayload>;
  /** アルバムを最新の状態にする */
  readonly upsertAlbum: Maybe<UpsertAlbumPayload>;
  /** アーティストを最新の状態にする */
  readonly upsertArtist: Maybe<UpsertArtistPayload>;
  /** プレイリストを作成更新する */
  readonly upsertPlaylist: Maybe<UpsertPlaylistPayload>;
  /** ロールを追加更新する */
  readonly upsertRole: Maybe<UpsertRolePayload>;
};

export type Mutation_AddPlaylistItemsArgs = {
  input: AddPlaylistItemsInput;
};

export type Mutation_ChangeFavoritesArgs = {
  input: ChangeFavoritesInput;
};

export type Mutation_ChangeStatusArgs = {
  input: ChangeStatusInput;
};

export type Mutation_ClearCacheArgs = {
  input: ClearCacheInput;
};

export type Mutation_CompactAlbumArgs = {
  input: CompactAlbumInput;
};

export type Mutation_ForceIgnoreAlbumArgs = {
  input: ForceIgnoreAlbumInput;
};

export type Mutation_GenerateSitemapsArgs = {
  input: GenerateSitemapsInput;
};

export type Mutation_IgnoreAlbumsArgs = {
  input: IgnoreAlbumsInput;
};

export type Mutation_IgnoreArtistsArgs = {
  input: IgnoreArtistsInput;
};

export type Mutation_LoginArgs = {
  input: LoginInput;
};

export type Mutation_LogoutArgs = {
  input: LogoutInput;
};

export type Mutation_MixAlbumArgs = {
  input: MixAlbumInput;
};

export type Mutation_MixArtistArgs = {
  input: MixArtistInput;
};

export type Mutation_SignupArgs = {
  input: SignupInput;
};

export type Mutation_UncompactAlbumArgs = {
  input: UncompactAlbumInput;
};

export type Mutation_UnmixAlbumArgs = {
  input: UnmixAlbumInput;
};

export type Mutation_UpdateMeArgs = {
  input: UpdateMeInput;
};

export type Mutation_UpsertAlbumArgs = {
  input: UpsertAlbumInput;
};

export type Mutation_UpsertArtistArgs = {
  input: UpsertArtistInput;
};

export type Mutation_UpsertPlaylistArgs = {
  input: UpsertPlaylistInput;
};

export type Mutation_UpsertRoleArgs = {
  input: UpsertRoleInput;
};

export type MyPlaylistsConditionsInputObject = {
  /** プレイリスト名( like 検索) */
  readonly name: Maybe<Scalars["String"]>;
};

export type MyPlaylistsQueryOrderEnum =
  /** 作成日順 */
  | "NEW"
  /** 更新日順 */
  | "UPDATED";

export type MyPlaylistsSortInputObject = {
  /** 並び順対象 */
  readonly order: Maybe<MyPlaylistsQueryOrderEnum>;
  /** 並び順 */
  readonly type: Maybe<SortEnum>;
};

/** プレイリスト */
export type Playlist = {
  /** 作者 */
  readonly author: Maybe<User>;
  /** 作成日 */
  readonly createdAt: Scalars["ISO8601DateTime"];
  /** 説明 */
  readonly description: Scalars["String"];
  /** ID */
  readonly id: Scalars["TTID"];
  /** 曲一覧 */
  readonly items: ReadonlyArray<PlaylistItem>;
  /** タイトル */
  readonly name: Scalars["String"];
  /** 公開種別 */
  readonly publicType: Scalars["String"];
  /** ジャケットトラック */
  readonly track: Track;
  /** 更新日 */
  readonly updatedAt: Scalars["ISO8601DateTime"];
};

/** プレイリストトラック */
export type PlaylistItem = {
  /** ID */
  readonly id: Scalars["TTID"];
  /** 曲 */
  readonly track: Track;
  /** トラックナンバー */
  readonly trackNumber: Scalars["Int"];
};

export type PlaylistPublicTypeEnum =
  /** 公開 */
  | "OPEN"
  /** 非公開 */
  | "NON_OPEN"
  /** 名前なし公開 */
  | "NO_NAME_OPEN";

export type PlaylistsConditionsInputObject = {
  /** プレイリスト名( like 検索) */
  readonly name: Maybe<Scalars["String"]>;
};

export type PlaylistsQueryOrderEnum =
  /** 作成日順 */
  "NEW";

export type PlaylistsSortInputObject = {
  /** 並び順対象 */
  readonly order: Maybe<PlaylistsQueryOrderEnum>;
  /** 並び順 */
  readonly type: Maybe<SortEnum>;
};

/** 公開情報 */
export type PublicInformation = {
  /** ID */
  readonly id: Scalars["TTID"];
  /** 公開タイプ */
  readonly publicType: Scalars["String"];
};

export type Query = {
  /** アルバム情報取得 */
  readonly album: Maybe<Album>;
  /** アルバム一覧取得 */
  readonly albums: ReadonlyArray<Album>;
  /** Apple Music Token */
  readonly appleMusicToken: Scalars["String"];
  /** アーティスト取得 */
  readonly artist: Maybe<Artist>;
  /** アーティスト一覧取得 */
  readonly artists: ReadonlyArray<Artist>;
  /** カレントユーザー情報取得 */
  readonly me: CurrentUser;
  /** マイプレイリスト一覧取得 */
  readonly myPlaylists: ReadonlyArray<Playlist>;
  /** プレイリスト取得 */
  readonly playlist: Maybe<Playlist>;
  /** プレイリスト一覧取得 */
  readonly playlists: ReadonlyArray<Playlist>;
  /** ロール一覧取得 */
  readonly roles: ReadonlyArray<Role>;
  /** Spotify Token */
  readonly spotifyToken: SpotifyToken;
  /** トラック一覧取得 */
  readonly tracks: ReadonlyArray<Track>;
};

export type Query_AlbumArgs = {
  id: Scalars["TTID"];
};

export type Query_AlbumsArgs = {
  cursor?: Maybe<CursorInputObject>;
  sort?: Maybe<AlbumsSortInputObject>;
  conditions: Maybe<AlbumsConditionsInputObject>;
};

export type Query_ArtistArgs = {
  id: Scalars["TTID"];
};

export type Query_ArtistsArgs = {
  cursor?: Maybe<CursorInputObject>;
  sort?: Maybe<ArtistsSortInputObject>;
  conditions: Maybe<ArtistsConditionsInputObject>;
};

export type Query_MyPlaylistsArgs = {
  cursor?: Maybe<CursorInputObject>;
  sort?: Maybe<MyPlaylistsSortInputObject>;
  conditions: Maybe<MyPlaylistsConditionsInputObject>;
};

export type Query_PlaylistArgs = {
  id: Scalars["TTID"];
};

export type Query_PlaylistsArgs = {
  cursor?: Maybe<CursorInputObject>;
  sort?: Maybe<PlaylistsSortInputObject>;
  conditions: Maybe<PlaylistsConditionsInputObject>;
};

export type Query_SpotifyTokenArgs = {
  code: Maybe<Scalars["String"]>;
  refreshToken: Maybe<Scalars["String"]>;
};

export type Query_TracksArgs = {
  cursor?: Maybe<CursorInputObject>;
  sort?: Maybe<TracksSortInputObject>;
  conditions: Maybe<TracksConditionsInputObject>;
};

/** ロール */
export type Role = {
  /** 出来ること一覧 */
  readonly allowedActions: ReadonlyArray<Scalars["String"]>;
  /** 説明 */
  readonly description: Scalars["String"];
  /** ID */
  readonly id: Scalars["TTID"];
  /** 名前 */
  readonly name: Scalars["String"];
};

/** Autogenerated input type of Signup */
export type SignupInput = {
  readonly name: Scalars["String"];
  readonly username: Scalars["String"];
  readonly password: Scalars["String"];
  readonly passwordConfirmation: Scalars["String"];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of Signup */
export type SignupPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly currentUser: Maybe<CurrentUser>;
  readonly error: Maybe<Scalars["String"]>;
};

export type SortEnum =
  /** 昇順 */
  | "ASC"
  /** 降順 */
  | "DESC";

/** Spotify アルバム */
export type SpotifyAlbum = {
  /** ID */
  readonly id: Scalars["TTID"];
  /** タイトル */
  readonly name: Scalars["String"];
  /** Spotify ID */
  readonly spotifyId: Scalars["String"];
};

/** Spotify アーティスト */
export type SpotifyArtist = {
  /** ID */
  readonly id: Scalars["TTID"];
  /** 名前 */
  readonly name: Scalars["String"];
  /** Spotify ID */
  readonly spotifyId: Scalars["String"];
};

/** Spotify Token */
export type SpotifyToken = {
  readonly accessToken: Scalars["String"];
  readonly expiresIn: Scalars["Int"];
  readonly refreshToken: Maybe<Scalars["String"]>;
  readonly scope: Scalars["String"];
  readonly tokenType: Scalars["String"];
};

/** Spotify トラック */
export type SpotifyTrack = {
  /** ID */
  readonly id: Scalars["TTID"];
  /** タイトル */
  readonly name: Scalars["String"];
  /** Spotify ID */
  readonly spotifyId: Scalars["String"];
};

export type StatusEnum =
  /** 保留 : デフォルトの検索結果に表示されない */
  | "PENDING"
  /** 有効 : 通常検索結果に表示される */
  | "ACTIVE"
  /** 除外 : 検索結果から除外される。最新情報などを取得する際などでも除外される */
  | "IGNORE";

/** トラック */
export type Track = {
  /** Apple Music トラック */
  readonly appleMusicTracks: Maybe<ReadonlyArray<AppleMusicTrack>>;
  /** 大型アートワーク */
  readonly artworkL: Artwork;
  /** 中型アートワーク */
  readonly artworkM: Artwork;
  /** ディスク番号 */
  readonly discNumber: Scalars["PositiveNumber"];
  /** 再生時間 */
  readonly durationMs: Scalars["PositiveNumber"];
  /** ID */
  readonly id: Scalars["TTID"];
  /** 国際標準レコーディングコード */
  readonly isrc: Scalars["String"];
  /** iTunes トラック */
  readonly itunesTracks: Maybe<ReadonlyArray<AppleMusicTrack>>;
  /** タイトル */
  readonly name: Scalars["String"];
  /** 人気度 */
  readonly popularity: Scalars["Int"];
  /** プレビューURL */
  readonly previewUrl: Maybe<Scalars["String"]>;
  /** Spotify トラック */
  readonly spotifyTracks: Maybe<ReadonlyArray<SpotifyTrack>>;
  /** ステータス */
  readonly status: StatusEnum;
  /** トラック番号 */
  readonly trackNumber: Scalars["PositiveNumber"];
};

export type TracksConditionsInputObject = {
  /** トラック名(あいまい検索) */
  readonly name: Maybe<Scalars["String"]>;
  /** 表示ステータス */
  readonly status: Maybe<ReadonlyArray<StatusEnum>>;
  /** お気に入り */
  readonly favorite: Maybe<Scalars["Boolean"]>;
};

export type TracksQueryOrderEnum =
  /** 名前順 */
  | "NAME"
  /** 追加順 */
  | "NEW"
  /** 人気順 */
  | "POPULARITY";

export type TracksSortInputObject = {
  /** 並び順対象 */
  readonly order: Maybe<TracksQueryOrderEnum>;
  /** 並び順 */
  readonly type: Maybe<SortEnum>;
};

/** Autogenerated input type of UncompactAlbum */
export type UncompactAlbumInput = {
  /** 統合解除したいアルバムID。Apple Music アルバムのみ解除される。 */
  readonly albumIdForAppleMusic: Maybe<Scalars["TTID"]>;
  /** 統合解除したいアルバムID。Spotify アルバムのみ解除される。 */
  readonly albumIdForSpotify: Maybe<Scalars["TTID"]>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of UncompactAlbum */
export type UncompactAlbumPayload = {
  /** 統合解除されたアルバム */
  readonly albums: Maybe<ReadonlyArray<Album>>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly error: Maybe<Scalars["String"]>;
};

/** Autogenerated input type of UnmixAlbum */
export type UnmixAlbumInput = {
  /** 混合解除したいアルバムID */
  readonly albumId: Scalars["TTID"];
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of UnmixAlbum */
export type UnmixAlbumPayload = {
  /** 混合されたアルバム */
  readonly albums: Maybe<ReadonlyArray<Album>>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly error: Maybe<Scalars["String"]>;
};

/** Autogenerated input type of UpdateMe */
export type UpdateMeInput = {
  readonly name: Maybe<Scalars["String"]>;
  readonly isPublicArtist: Scalars["Boolean"];
  readonly isPublicAlbum: Scalars["Boolean"];
  readonly newPassword: Maybe<Scalars["String"]>;
  readonly passwordConfirmation: Maybe<Scalars["String"]>;
  readonly oldPassword: Maybe<Scalars["String"]>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of UpdateMe */
export type UpdateMePayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly currentUser: Maybe<CurrentUser>;
  readonly error: Maybe<Scalars["String"]>;
};

/** Autogenerated input type of UpsertAlbum */
export type UpsertAlbumInput = {
  /** 指定したアルバムのトラック(ISRC)を含んでいる別音楽サービスのアルバムを一括登録 */
  readonly albumId: Maybe<Scalars["TTID"]>;
  /** Apple Music か iTunes のアルバムを登録 */
  readonly appleMusicId: Maybe<Scalars["String"]>;
  /** Spotify のアルバムを登録 */
  readonly spotifyId: Maybe<Scalars["String"]>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of UpsertAlbum */
export type UpsertAlbumPayload = {
  /** 追加されたアルバム */
  readonly albums: Maybe<ReadonlyArray<Album>>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly error: Maybe<Scalars["String"]>;
};

/** Autogenerated input type of UpsertArtist */
export type UpsertArtistInput = {
  /**
   * アーティスト名から全ての音楽サービスのアーティストを登録。登録後、関連アルバム、トラックを全て保存する。
   * (ありきたりなアーティスト名の場合は関係のないアーティストが登録される可能性があるため注意)
   */
  readonly artistName: Maybe<Scalars["String"]>;
  /** アーティストに関連する音楽サービスアーティストを更新。関連アルバム、トラックを全て更新する。 */
  readonly artistId: Maybe<Scalars["String"]>;
  /** Apple Music のアーティストを登録。登録後、関連アルバム、トラックを全て保存する。 */
  readonly appleMusicId: Maybe<Scalars["String"]>;
  /** Spotify のアーティストを登録。登録後、関連アルバム、トラックを全て保存する。 */
  readonly spotifyId: Maybe<Scalars["String"]>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of UpsertArtist */
export type UpsertArtistPayload = {
  /** 追加されたアーティスト */
  readonly artists: Maybe<ReadonlyArray<Artist>>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly error: Maybe<Scalars["String"]>;
};

/** Autogenerated input type of UpsertPlaylist */
export type UpsertPlaylistInput = {
  /** IDがない場合は作成 */
  readonly playlistId: Maybe<Scalars["TTID"]>;
  /** ジャケットトラックID */
  readonly trackId: Scalars["TTID"];
  /** タイトル */
  readonly name: Scalars["String"];
  /** 説明 */
  readonly description: Maybe<Scalars["String"]>;
  /** 公開種別 */
  readonly publicType: PlaylistPublicTypeEnum;
  /** トラックID */
  readonly trackIds: ReadonlyArray<Scalars["TTID"]>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of UpsertPlaylist */
export type UpsertPlaylistPayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly error: Maybe<Scalars["String"]>;
  /** 作成更新されたプレイリスト */
  readonly playlist: Maybe<Playlist>;
};

/** Autogenerated input type of UpsertRole */
export type UpsertRoleInput = {
  /** 変更したいロール。IDを指定しない場合は追加される */
  readonly id: Maybe<Scalars["TTID"]>;
  /** ロール名。IDを指定しない場合は必須。 */
  readonly name: Maybe<Scalars["String"]>;
  /** ロールの説明。IDを指定しない場合は必須。 */
  readonly description: Maybe<Scalars["String"]>;
  /** 変更したいアクション。全て上書きされる。IDを指定しない場合は必須。 */
  readonly allowedActions: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
};

/** Autogenerated return type of UpsertRole */
export type UpsertRolePayload = {
  /** A unique identifier for the client performing the mutation. */
  readonly clientMutationId: Maybe<Scalars["String"]>;
  readonly error: Maybe<Scalars["String"]>;
  /** 追加更新されたロール */
  readonly role: Maybe<Role>;
};

/** ユーザー */
export type User = {
  /** ID */
  readonly id: Scalars["TTID"];
  /** 名前 */
  readonly name: Scalars["String"];
  /** ユーザー名 */
  readonly username: Scalars["String"];
};

export type AlbumsQueryVariables = Exact<{
  cursor: Maybe<CursorInputObject>;
  sort: Maybe<AlbumsSortInputObject>;
  conditions: Maybe<AlbumsConditionsInputObject>;
}>;

export type AlbumsQuery = {
  readonly items: ReadonlyArray<
    Pick<Album, "id" | "name" | "status"> & {
      readonly artworkM: Pick<Artwork, "url" | "width" | "height">;
      readonly appleMusicAlbum: Maybe<Pick<AppleMusicAlbum, "id">>;
      readonly itunesAlbum: Maybe<Pick<AppleMusicAlbum, "id">>;
      readonly spotifyAlbum: Maybe<Pick<SpotifyAlbum, "id">>;
    }
  >;
};

export const AlbumsDocument: DocumentNode<AlbumsQuery, AlbumsQueryVariables> = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Albums" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "cursor" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "CursorInputObject" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "sort" } },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "AlbumsSortInputObject" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "conditions" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "AlbumsConditionsInputObject" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            alias: { kind: "Name", value: "items" },
            name: { kind: "Name", value: "albums" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "cursor" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "cursor" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "sort" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "sort" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "conditions" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "conditions" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "artworkM" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      { kind: "Field", name: { kind: "Name", value: "width" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "height" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "appleMusicAlbum" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "itunesAlbum" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "spotifyAlbum" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
};
