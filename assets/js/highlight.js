/*! highlight.js v9.12.0 | BSD3 License | git.io/hljslicense */
!(function (e) {
  var n = ("object" == typeof window && window) || ("object" == typeof self && self);
  "undefined" != typeof exports
    ? e(exports)
    : n &&
      ((n.hljs = e({})),
      "function" == typeof define &&
        define.amd &&
        define([], function () {
          return n.hljs;
        }));
})(function (e) {
  function n(e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function t(e) {
    return e.nodeName.toLowerCase();
  }
  function r(e, n) {
    var t = e && e.exec(n);
    return t && 0 === t.index;
  }
  function a(e) {
    return k.test(e);
  }
  function i(e) {
    var n,
      t,
      r,
      i,
      o = e.className + " ";
    if (((o += e.parentNode ? e.parentNode.className : ""), (t = B.exec(o)))) return w(t[1]) ? t[1] : "no-highlight";
    for (o = o.split(/\s+/), n = 0, r = o.length; r > n; n++) if (((i = o[n]), a(i) || w(i))) return i;
  }
  function o(e) {
    var n,
      t = {},
      r = Array.prototype.slice.call(arguments, 1);
    for (n in e) t[n] = e[n];
    return (
      r.forEach(function (e) {
        for (n in e) t[n] = e[n];
      }),
      t
    );
  }
  function u(e) {
    var n = [];
    return (
      (function r(e, a) {
        for (var i = e.firstChild; i; i = i.nextSibling) 3 === i.nodeType ? (a += i.nodeValue.length) : 1 === i.nodeType && (n.push({ event: "start", offset: a, node: i }), (a = r(i, a)), t(i).match(/br|hr|img|input/) || n.push({ event: "stop", offset: a, node: i }));
        return a;
      })(e, 0),
      n
    );
  }
  function c(e, r, a) {
    function i() {
      return e.length && r.length ? (e[0].offset !== r[0].offset ? (e[0].offset < r[0].offset ? e : r) : "start" === r[0].event ? e : r) : e.length ? e : r;
    }
    function o(e) {
      function r(e) {
        return " " + e.nodeName + '="' + n(e.value).replace('"', "&quot;") + '"';
      }
      s += "<" + t(e) + E.map.call(e.attributes, r).join("") + ">";
    }
    function u(e) {
      s += "</" + t(e) + ">";
    }
    function c(e) {
      ("start" === e.event ? o : u)(e.node);
    }
    for (var l = 0, s = "", f = []; e.length || r.length; ) {
      var g = i();
      if (((s += n(a.substring(l, g[0].offset))), (l = g[0].offset), g === e)) {
        f.reverse().forEach(u);
        do c(g.splice(0, 1)[0]), (g = i());
        while (g === e && g.length && g[0].offset === l);
        f.reverse().forEach(o);
      } else "start" === g[0].event ? f.push(g[0].node) : f.pop(), c(g.splice(0, 1)[0]);
    }
    return s + n(a.substr(l));
  }
  function l(e) {
    return (
      e.v &&
        !e.cached_variants &&
        (e.cached_variants = e.v.map(function (n) {
          return o(e, { v: null }, n);
        })),
      e.cached_variants || (e.eW && [o(e)]) || [e]
    );
  }
  function s(e) {
    function n(e) {
      return (e && e.source) || e;
    }
    function t(t, r) {
      return new RegExp(n(t), "m" + (e.cI ? "i" : "") + (r ? "g" : ""));
    }
    function r(a, i) {
      if (!a.compiled) {
        if (((a.compiled = !0), (a.k = a.k || a.bK), a.k)) {
          var o = {},
            u = function (n, t) {
              e.cI && (t = t.toLowerCase()),
                t.split(" ").forEach(function (e) {
                  var t = e.split("|");
                  o[t[0]] = [n, t[1] ? Number(t[1]) : 1];
                });
            };
          "string" == typeof a.k
            ? u("keyword", a.k)
            : x(a.k).forEach(function (e) {
                u(e, a.k[e]);
              }),
            (a.k = o);
        }
        (a.lR = t(a.l || /\w+/, !0)),
          i && (a.bK && (a.b = "\\b(" + a.bK.split(" ").join("|") + ")\\b"), a.b || (a.b = /\B|\b/), (a.bR = t(a.b)), a.e || a.eW || (a.e = /\B|\b/), a.e && (a.eR = t(a.e)), (a.tE = n(a.e) || ""), a.eW && i.tE && (a.tE += (a.e ? "|" : "") + i.tE)),
          a.i && (a.iR = t(a.i)),
          null == a.r && (a.r = 1),
          a.c || (a.c = []),
          (a.c = Array.prototype.concat.apply(
            [],
            a.c.map(function (e) {
              return l("self" === e ? a : e);
            })
          )),
          a.c.forEach(function (e) {
            r(e, a);
          }),
          a.starts && r(a.starts, i);
        var c = a.c
          .map(function (e) {
            return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b;
          })
          .concat([a.tE, a.i])
          .map(n)
          .filter(Boolean);
        a.t = c.length
          ? t(c.join("|"), !0)
          : {
              exec: function () {
                return null;
              },
            };
      }
    }
    r(e);
  }
  function f(e, t, a, i) {
    function o(e, n) {
      var t, a;
      for (t = 0, a = n.c.length; a > t; t++) if (r(n.c[t].bR, e)) return n.c[t];
    }
    function u(e, n) {
      if (r(e.eR, n)) {
        for (; e.endsParent && e.parent; ) e = e.parent;
        return e;
      }
      return e.eW ? u(e.parent, n) : void 0;
    }
    function c(e, n) {
      return !a && r(n.iR, e);
    }
    function l(e, n) {
      var t = N.cI ? n[0].toLowerCase() : n[0];
      return e.k.hasOwnProperty(t) && e.k[t];
    }
    function p(e, n, t, r) {
      var a = r ? "" : I.classPrefix,
        i = '<span class="' + a,
        o = t ? "" : C;
      return (i += e + '">'), i + n + o;
    }
    function h() {
      var e, t, r, a;
      if (!E.k) return n(k);
      for (a = "", t = 0, E.lR.lastIndex = 0, r = E.lR.exec(k); r; ) (a += n(k.substring(t, r.index))), (e = l(E, r)), e ? ((B += e[1]), (a += p(e[0], n(r[0])))) : (a += n(r[0])), (t = E.lR.lastIndex), (r = E.lR.exec(k));
      return a + n(k.substr(t));
    }
    function d() {
      var e = "string" == typeof E.sL;
      if (e && !y[E.sL]) return n(k);
      var t = e ? f(E.sL, k, !0, x[E.sL]) : g(k, E.sL.length ? E.sL : void 0);
      return E.r > 0 && (B += t.r), e && (x[E.sL] = t.top), p(t.language, t.value, !1, !0);
    }
    function b() {
      (L += null != E.sL ? d() : h()), (k = "");
    }
    function v(e) {
      (L += e.cN ? p(e.cN, "", !0) : ""), (E = Object.create(e, { parent: { value: E } }));
    }
    function m(e, n) {
      if (((k += e), null == n)) return b(), 0;
      var t = o(n, E);
      if (t) return t.skip ? (k += n) : (t.eB && (k += n), b(), t.rB || t.eB || (k = n)), v(t, n), t.rB ? 0 : n.length;
      var r = u(E, n);
      if (r) {
        var a = E;
        a.skip ? (k += n) : (a.rE || a.eE || (k += n), b(), a.eE && (k = n));
        do E.cN && (L += C), E.skip || (B += E.r), (E = E.parent);
        while (E !== r.parent);
        return r.starts && v(r.starts, ""), a.rE ? 0 : n.length;
      }
      if (c(n, E)) throw new Error('Illegal lexeme "' + n + '" for mode "' + (E.cN || "<unnamed>") + '"');
      return (k += n), n.length || 1;
    }
    var N = w(e);
    if (!N) throw new Error('Unknown language: "' + e + '"');
    s(N);
    var R,
      E = i || N,
      x = {},
      L = "";
    for (R = E; R !== N; R = R.parent) R.cN && (L = p(R.cN, "", !0) + L);
    var k = "",
      B = 0;
    try {
      for (var M, j, O = 0; ; ) {
        if (((E.t.lastIndex = O), (M = E.t.exec(t)), !M)) break;
        (j = m(t.substring(O, M.index), M[0])), (O = M.index + j);
      }
      for (m(t.substr(O)), R = E; R.parent; R = R.parent) R.cN && (L += C);
      return { r: B, value: L, language: e, top: E };
    } catch (T) {
      if (T.message && -1 !== T.message.indexOf("Illegal")) return { r: 0, value: n(t) };
      throw T;
    }
  }
  function g(e, t) {
    t = t || I.languages || x(y);
    var r = { r: 0, value: n(e) },
      a = r;
    return (
      t.filter(w).forEach(function (n) {
        var t = f(n, e, !1);
        (t.language = n), t.r > a.r && (a = t), t.r > r.r && ((a = r), (r = t));
      }),
      a.language && (r.second_best = a),
      r
    );
  }
  function p(e) {
    return I.tabReplace || I.useBR
      ? e.replace(M, function (e, n) {
          return I.useBR && "\n" === e ? "<br>" : I.tabReplace ? n.replace(/\t/g, I.tabReplace) : "";
        })
      : e;
  }
  function h(e, n, t) {
    var r = n ? L[n] : t,
      a = [e.trim()];
    return e.match(/\bhljs\b/) || a.push("hljs"), -1 === e.indexOf(r) && a.push(r), a.join(" ").trim();
  }
  function d(e) {
    var n,
      t,
      r,
      o,
      l,
      s = i(e);
    a(s) || (I.useBR ? ((n = document.createElementNS("http://www.w3.org/1999/xhtml", "div")), (n.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n"))) : (n = e), (l = n.textContent), (r = s ? f(s, l, !0) : g(l)), (t = u(n)), t.length && ((o = document.createElementNS("http://www.w3.org/1999/xhtml", "div")), (o.innerHTML = r.value), (r.value = c(t, u(o), l))), (r.value = p(r.value)), (e.innerHTML = r.value), (e.className = h(e.className, s, r.language)), (e.result = { language: r.language, re: r.r }), r.second_best && (e.second_best = { language: r.second_best.language, re: r.second_best.r }));
  }
  function b(e) {
    I = o(I, e);
  }
  function v() {
    if (!v.called) {
      v.called = !0;
      var e = document.querySelectorAll("pre code");
      E.forEach.call(e, d);
    }
  }
  function m() {
    addEventListener("DOMContentLoaded", v, !1), addEventListener("load", v, !1);
  }
  function N(n, t) {
    var r = (y[n] = t(e));
    r.aliases &&
      r.aliases.forEach(function (e) {
        L[e] = n;
      });
  }
  function R() {
    return x(y);
  }
  function w(e) {
    return (e = (e || "").toLowerCase()), y[e] || y[L[e]];
  }
  var E = [],
    x = Object.keys,
    y = {},
    L = {},
    k = /^(no-?highlight|plain|text)$/i,
    B = /\blang(?:uage)?-([\w-]+)\b/i,
    M = /((^(<[^>]+>|\t|)+|(?:\n)))/gm,
    C = "</span>",
    I = { classPrefix: "hljs-", tabReplace: null, useBR: !1, languages: void 0 };
  return (
    (e.highlight = f),
    (e.highlightAuto = g),
    (e.fixMarkup = p),
    (e.highlightBlock = d),
    (e.configure = b),
    (e.initHighlighting = v),
    (e.initHighlightingOnLoad = m),
    (e.registerLanguage = N),
    (e.listLanguages = R),
    (e.getLanguage = w),
    (e.inherit = o),
    (e.IR = "[a-zA-Z]\\w*"),
    (e.UIR = "[a-zA-Z_]\\w*"),
    (e.NR = "\\b\\d+(\\.\\d+)?"),
    (e.CNR = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)"),
    (e.BNR = "\\b(0b[01]+)"),
    (e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~"),
    (e.BE = { b: "\\\\[\\s\\S]", r: 0 }),
    (e.ASM = { cN: "string", b: "'", e: "'", i: "\\n", c: [e.BE] }),
    (e.QSM = { cN: "string", b: '"', e: '"', i: "\\n", c: [e.BE] }),
    (e.PWM = { b: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/ }),
    (e.C = function (n, t, r) {
      var a = e.inherit({ cN: "comment", b: n, e: t, c: [] }, r || {});
      return a.c.push(e.PWM), a.c.push({ cN: "doctag", b: "(?:TODO|FIXME|NOTE|BUG|XXX):", r: 0 }), a;
    }),
    (e.CLCM = e.C("//", "$")),
    (e.CBCM = e.C("/\\*", "\\*/")),
    (e.HCM = e.C("#", "$")),
    (e.NM = { cN: "number", b: e.NR, r: 0 }),
    (e.CNM = { cN: "number", b: e.CNR, r: 0 }),
    (e.BNM = { cN: "number", b: e.BNR, r: 0 }),
    (e.CSSNM = { cN: "number", b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?", r: 0 }),
    (e.RM = { cN: "regexp", b: /\//, e: /\/[gimuy]*/, i: /\n/, c: [e.BE, { b: /\[/, e: /\]/, r: 0, c: [e.BE] }] }),
    (e.TM = { cN: "title", b: e.IR, r: 0 }),
    (e.UTM = { cN: "title", b: e.UIR, r: 0 }),
    (e.METHOD_GUARD = { b: "\\.\\s*" + e.UIR, r: 0 }),
    e
  );
});
hljs.registerLanguage("sql", function (e) {
  var t = e.C("--", "$");
  return {
    cI: !0,
    i: /[<>{}*#]/,
    c: [
      {
        bK: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment",
        e: /;/,
        eW: !0,
        l: /[\w\.]+/,
        k: {
          keyword:
            "abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security seed segment select self sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",
          literal: "true false null",
          built_in: "array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void",
        },
        c: [{ cN: "string", b: "'", e: "'", c: [e.BE, { b: "''" }] }, { cN: "string", b: '"', e: '"', c: [e.BE, { b: '""' }] }, { cN: "string", b: "`", e: "`", c: [e.BE] }, e.CNM, e.CBCM, t],
      },
      e.CBCM,
      t,
    ],
  };
});
hljs.registerLanguage("r", function (e) {
  var r = "([a-zA-Z]|\\.[a-zA-Z.])[a-zA-Z0-9._]*";
  return {
    c: [
      e.HCM,
      { b: r, l: r, k: { keyword: "function if in break next repeat else for return switch while try tryCatch stop warning require library attach detach source setMethod setGeneric setGroupGeneric setClass ...", literal: "NULL NA TRUE FALSE T F Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10" }, r: 0 },
      { cN: "number", b: "0[xX][0-9a-fA-F]+[Li]?\\b", r: 0 },
      { cN: "number", b: "\\d+(?:[eE][+\\-]?\\d*)?L\\b", r: 0 },
      { cN: "number", b: "\\d+\\.(?!\\d)(?:i\\b)?", r: 0 },
      { cN: "number", b: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b", r: 0 },
      { cN: "number", b: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b", r: 0 },
      { b: "`", e: "`", r: 0 },
      {
        cN: "string",
        c: [e.BE],
        v: [
          { b: '"', e: '"' },
          { b: "'", e: "'" },
        ],
      },
    ],
  };
});
hljs.registerLanguage("perl", function (e) {
  var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
    r = { cN: "subst", b: "[$@]\\{", e: "\\}", k: t },
    s = { b: "->{", e: "}" },
    n = { v: [{ b: /\$\d/ }, { b: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/ }, { b: /[\$%@][^\s\w{]/, r: 0 }] },
    i = [e.BE, r, n],
    o = [
      n,
      e.HCM,
      e.C("^\\=\\w", "\\=cut", { eW: !0 }),
      s,
      {
        cN: "string",
        c: i,
        v: [
          { b: "q[qwxr]?\\s*\\(", e: "\\)", r: 5 },
          { b: "q[qwxr]?\\s*\\[", e: "\\]", r: 5 },
          { b: "q[qwxr]?\\s*\\{", e: "\\}", r: 5 },
          { b: "q[qwxr]?\\s*\\|", e: "\\|", r: 5 },
          { b: "q[qwxr]?\\s*\\<", e: "\\>", r: 5 },
          { b: "qw\\s+q", e: "q", r: 5 },
          { b: "'", e: "'", c: [e.BE] },
          { b: '"', e: '"' },
          { b: "`", e: "`", c: [e.BE] },
          { b: "{\\w+}", c: [], r: 0 },
          { b: "-?\\w+\\s*\\=\\>", c: [], r: 0 },
        ],
      },
      { cN: "number", b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b", r: 0 },
      { b: "(\\/\\/|" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*", k: "split return print reverse grep", r: 0, c: [e.HCM, { cN: "regexp", b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*", r: 10 }, { cN: "regexp", b: "(m|qr)?/", e: "/[a-z]*", c: [e.BE], r: 0 }] },
      { cN: "function", bK: "sub", e: "(\\s*\\(.*?\\))?[;{]", eE: !0, r: 5, c: [e.TM] },
      { b: "-\\w\\b", r: 0 },
      { b: "^__DATA__$", e: "^__END__$", sL: "mojolicious", c: [{ b: "^@@.*", e: "$", cN: "comment" }] },
    ];
  return (r.c = o), (s.c = o), { aliases: ["pl", "pm"], l: /[\w\.]+/, k: t, c: o };
});
hljs.registerLanguage("ini", function (e) {
  var b = {
    cN: "string",
    c: [e.BE],
    v: [
      { b: "'''", e: "'''", r: 10 },
      { b: '"""', e: '"""', r: 10 },
      { b: '"', e: '"' },
      { b: "'", e: "'" },
    ],
  };
  return {
    aliases: ["toml"],
    cI: !0,
    i: /\S/,
    c: [
      e.C(";", "$"),
      e.HCM,
      { cN: "section", b: /^\s*\[+/, e: /\]+/ },
      {
        b: /^[a-z0-9\[\]_-]+\s*=\s*/,
        e: "$",
        rB: !0,
        c: [
          { cN: "attr", b: /[a-z0-9\[\]_-]+/ },
          { b: /=/, eW: !0, r: 0, c: [{ cN: "literal", b: /\bon|off|true|false|yes|no\b/ }, { cN: "variable", v: [{ b: /\$[\w\d"][\w\d_]*/ }, { b: /\$\{(.*?)}/ }] }, b, { cN: "number", b: /([\+\-]+)?[\d]+_[\d_]+/ }, e.NM] },
        ],
      },
    ],
  };
});
hljs.registerLanguage("diff", function (e) {
  return {
    aliases: ["patch"],
    c: [
      { cN: "meta", r: 10, v: [{ b: /^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/ }, { b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/ }, { b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/ }] },
      {
        cN: "comment",
        v: [
          { b: /Index: /, e: /$/ },
          { b: /={3,}/, e: /$/ },
          { b: /^\-{3}/, e: /$/ },
          { b: /^\*{3} /, e: /$/ },
          { b: /^\+{3}/, e: /$/ },
          { b: /\*{5}/, e: /\*{5}$/ },
        ],
      },
      { cN: "addition", b: "^\\+", e: "$" },
      { cN: "deletion", b: "^\\-", e: "$" },
      { cN: "addition", b: "^\\!", e: "$" },
    ],
  };
});
hljs.registerLanguage("go", function (e) {
  var t = { keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune", literal: "true false iota nil", built_in: "append cap close complex copy imag len make new panic print println real recover delete" };
  return { aliases: ["golang"], k: t, i: "</", c: [e.CLCM, e.CBCM, { cN: "string", v: [e.QSM, { b: "'", e: "[^\\\\]'" }, { b: "`", e: "`" }] }, { cN: "number", v: [{ b: e.CNR + "[dflsi]", r: 1 }, e.CNM] }, { b: /:=/ }, { cN: "function", bK: "func", e: /\s*\{/, eE: !0, c: [e.TM, { cN: "params", b: /\(/, e: /\)/, k: t, i: /["']/ }] }] };
});
hljs.registerLanguage("bash", function (e) {
  var t = { cN: "variable", v: [{ b: /\$[\w\d#@][\w\d_]*/ }, { b: /\$\{(.*?)}/ }] },
    s = { cN: "string", b: /"/, e: /"/, c: [e.BE, t, { cN: "variable", b: /\$\(/, e: /\)/, c: [e.BE] }] },
    a = { cN: "string", b: /'/, e: /'/ };
  return { aliases: ["sh", "zsh"], l: /\b-?[a-z\._]+\b/, k: { keyword: "if then else elif fi for while in do done case esac function", literal: "true false", built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp", _: "-ne -eq -lt -gt -f -d -e -s -l -a" }, c: [{ cN: "meta", b: /^#![^\n]+sh\s*$/, r: 10 }, { cN: "function", b: /\w[\w\d_]*\s*\(\s*\)\s*\{/, rB: !0, c: [e.inherit(e.TM, { b: /\w[\w\d_]*/ })], r: 0 }, e.HCM, s, a, t] };
});
hljs.registerLanguage("python", function (e) {
  var r = { keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False", built_in: "Ellipsis NotImplemented" },
    b = { cN: "meta", b: /^(>>>|\.\.\.) / },
    c = { cN: "subst", b: /\{/, e: /\}/, k: r, i: /#/ },
    a = { cN: "string", c: [e.BE], v: [{ b: /(u|b)?r?'''/, e: /'''/, c: [b], r: 10 }, { b: /(u|b)?r?"""/, e: /"""/, c: [b], r: 10 }, { b: /(fr|rf|f)'''/, e: /'''/, c: [b, c] }, { b: /(fr|rf|f)"""/, e: /"""/, c: [b, c] }, { b: /(u|r|ur)'/, e: /'/, r: 10 }, { b: /(u|r|ur)"/, e: /"/, r: 10 }, { b: /(b|br)'/, e: /'/ }, { b: /(b|br)"/, e: /"/ }, { b: /(fr|rf|f)'/, e: /'/, c: [c] }, { b: /(fr|rf|f)"/, e: /"/, c: [c] }, e.ASM, e.QSM] },
    s = { cN: "number", r: 0, v: [{ b: e.BNR + "[lLjJ]?" }, { b: "\\b(0o[0-7]+)[lLjJ]?" }, { b: e.CNR + "[lLjJ]?" }] },
    i = { cN: "params", b: /\(/, e: /\)/, c: ["self", b, s, a] };
  return (
    (c.c = [a, s, b]),
    {
      aliases: ["py", "gyp"],
      k: r,
      i: /(<\/|->|\?)|=>/,
      c: [
        b,
        s,
        a,
        e.HCM,
        {
          v: [
            { cN: "function", bK: "def" },
            { cN: "class", bK: "class" },
          ],
          e: /:/,
          i: /[${=;\n,]/,
          c: [e.UTM, i, { b: /->/, eW: !0, k: "None" }],
        },
        { cN: "meta", b: /^[\t ]*@/, e: /$/ },
        { b: /\b(print|exec)\(/ },
      ],
    }
  );
});
hljs.registerLanguage("julia", function (e) {
  var r = {
      keyword: "in isa where baremodule begin break catch ccall const continue do else elseif end export false finally for function global if import importall let local macro module quote return true try using while type immutable abstract bitstype typealias ",
      literal: "true false ARGS C_NULL DevNull ENDIAN_BOM ENV I Inf Inf16 Inf32 Inf64 InsertionSort JULIA_HOME LOAD_PATH MergeSort NaN NaN16 NaN32 NaN64 PROGRAM_FILE QuickSort RoundDown RoundFromZero RoundNearest RoundNearestTiesAway RoundNearestTiesUp RoundToZero RoundUp STDERR STDIN STDOUT VERSION catalan e|0 eu|0 eulergamma golden im nothing pi γ π φ ",
      built_in:
        "ANY AbstractArray AbstractChannel AbstractFloat AbstractMatrix AbstractRNG AbstractSerializer AbstractSet AbstractSparseArray AbstractSparseMatrix AbstractSparseVector AbstractString AbstractUnitRange AbstractVecOrMat AbstractVector Any ArgumentError Array AssertionError Associative Base64DecodePipe Base64EncodePipe Bidiagonal BigFloat BigInt BitArray BitMatrix BitVector Bool BoundsError BufferStream CachingPool CapturedException CartesianIndex CartesianRange Cchar Cdouble Cfloat Channel Char Cint Cintmax_t Clong Clonglong ClusterManager Cmd CodeInfo Colon Complex Complex128 Complex32 Complex64 CompositeException Condition ConjArray ConjMatrix ConjVector Cptrdiff_t Cshort Csize_t Cssize_t Cstring Cuchar Cuint Cuintmax_t Culong Culonglong Cushort Cwchar_t Cwstring DataType Date DateFormat DateTime DenseArray DenseMatrix DenseVecOrMat DenseVector Diagonal Dict DimensionMismatch Dims DirectIndexString Display DivideError DomainError EOFError EachLine Enum Enumerate ErrorException Exception ExponentialBackOff Expr Factorization FileMonitor Float16 Float32 Float64 Function Future GlobalRef GotoNode HTML Hermitian IO IOBuffer IOContext IOStream IPAddr IPv4 IPv6 IndexCartesian IndexLinear IndexStyle InexactError InitError Int Int128 Int16 Int32 Int64 Int8 IntSet Integer InterruptException InvalidStateException Irrational KeyError LabelNode LinSpace LineNumberNode LoadError LowerTriangular MIME Matrix MersenneTwister Method MethodError MethodTable Module NTuple NewvarNode NullException Nullable Number ObjectIdDict OrdinalRange OutOfMemoryError OverflowError Pair ParseError PartialQuickSort PermutedDimsArray Pipe PollingFileWatcher ProcessExitedException Ptr QuoteNode RandomDevice Range RangeIndex Rational RawFD ReadOnlyMemoryError Real ReentrantLock Ref Regex RegexMatch RemoteChannel RemoteException RevString RoundingMode RowVector SSAValue SegmentationFault SerializationState Set SharedArray SharedMatrix SharedVector Signed SimpleVector Slot SlotNumber SparseMatrixCSC SparseVector StackFrame StackOverflowError StackTrace StepRange StepRangeLen StridedArray StridedMatrix StridedVecOrMat StridedVector String SubArray SubString SymTridiagonal Symbol Symmetric SystemError TCPSocket Task Text TextDisplay Timer Tridiagonal Tuple Type TypeError TypeMapEntry TypeMapLevel TypeName TypeVar TypedSlot UDPSocket UInt UInt128 UInt16 UInt32 UInt64 UInt8 UndefRefError UndefVarError UnicodeError UniformScaling Union UnionAll UnitRange Unsigned UpperTriangular Val Vararg VecElement VecOrMat Vector VersionNumber Void WeakKeyDict WeakRef WorkerConfig WorkerPool ",
    },
    t = "[A-Za-z_\\u00A1-\\uFFFF][A-Za-z_0-9\\u00A1-\\uFFFF]*",
    a = { l: t, k: r, i: /<\// },
    n = { cN: "number", b: /(\b0x[\d_]*(\.[\d_]*)?|0x\.\d[\d_]*)p[-+]?\d+|\b0[box][a-fA-F0-9][a-fA-F0-9_]*|(\b\d[\d_]*(\.[\d_]*)?|\.\d[\d_]*)([eEfF][-+]?\d+)?/, r: 0 },
    o = { cN: "string", b: /'(.|\\[xXuU][a-zA-Z0-9]+)'/ },
    i = { cN: "subst", b: /\$\(/, e: /\)/, k: r },
    l = { cN: "variable", b: "\\$" + t },
    c = {
      cN: "string",
      c: [e.BE, i, l],
      v: [
        { b: /\w*"""/, e: /"""\w*/, r: 10 },
        { b: /\w*"/, e: /"\w*/ },
      ],
    },
    s = { cN: "string", c: [e.BE, i, l], b: "`", e: "`" },
    d = { cN: "meta", b: "@" + t },
    u = {
      cN: "comment",
      v: [
        { b: "#=", e: "=#", r: 10 },
        { b: "#", e: "$" },
      ],
    };
  return (a.c = [n, o, c, s, d, u, e.HCM, { cN: "keyword", b: "\\b(((abstract|primitive)\\s+)type|(mutable\\s+)?struct)\\b" }, { b: /<:/ }]), (i.c = a.c), a;
});
hljs.registerLanguage("coffeescript", function (e) {
  var c = { keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super yield import export from as default await then unless until loop of by when and or is isnt not", literal: "true false null undefined yes no on off", built_in: "npm require console print module global window document" },
    n = "[A-Za-z$_][0-9A-Za-z$_]*",
    r = { cN: "subst", b: /#\{/, e: /}/, k: c },
    i = [
      e.BNM,
      e.inherit(e.CNM, { starts: { e: "(\\s*/)?", r: 0 } }),
      {
        cN: "string",
        v: [
          { b: /'''/, e: /'''/, c: [e.BE] },
          { b: /'/, e: /'/, c: [e.BE] },
          { b: /"""/, e: /"""/, c: [e.BE, r] },
          { b: /"/, e: /"/, c: [e.BE, r] },
        ],
      },
      { cN: "regexp", v: [{ b: "///", e: "///", c: [r, e.HCM] }, { b: "//[gim]*", r: 0 }, { b: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/ }] },
      { b: "@" + n },
      {
        sL: "javascript",
        eB: !0,
        eE: !0,
        v: [
          { b: "```", e: "```" },
          { b: "`", e: "`" },
        ],
      },
    ];
  r.c = i;
  var s = e.inherit(e.TM, { b: n }),
    t = "(\\(.*\\))?\\s*\\B[-=]>",
    o = { cN: "params", b: "\\([^\\(]", rB: !0, c: [{ b: /\(/, e: /\)/, k: c, c: ["self"].concat(i) }] };
  return { aliases: ["coffee", "cson", "iced"], k: c, i: /\/\*/, c: i.concat([e.C("###", "###"), e.HCM, { cN: "function", b: "^\\s*" + n + "\\s*=\\s*" + t, e: "[-=]>", rB: !0, c: [s, o] }, { b: /[:\(,=]\s*/, r: 0, c: [{ cN: "function", b: t, e: "[-=]>", rB: !0, c: [o] }] }, { cN: "class", bK: "class", e: "$", i: /[:="\[\]]/, c: [{ bK: "extends", eW: !0, i: /[:="\[\]]/, c: [s] }, s] }, { b: n + ":", e: ":", rB: !0, rE: !0, r: 0 }]) };
});
hljs.registerLanguage("cpp", function (t) {
  var e = { cN: "keyword", b: "\\b[a-z\\d_]*_t\\b" },
    r = {
      cN: "string",
      v: [
        { b: '(u8?|U)?L?"', e: '"', i: "\\n", c: [t.BE] },
        { b: '(u8?|U)?R"', e: '"', c: [t.BE] },
        { b: "'\\\\?.", e: "'", i: "." },
      ],
    },
    s = { cN: "number", v: [{ b: "\\b(0b[01']+)" }, { b: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)" }, { b: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)" }], r: 0 },
    i = { cN: "meta", b: /#\s*[a-z]+\b/, e: /$/, k: { "meta-keyword": "if else elif endif define undef warning error line pragma ifdef ifndef include" }, c: [{ b: /\\\n/, r: 0 }, t.inherit(r, { cN: "meta-string" }), { cN: "meta-string", b: /<[^\n>]*>/, e: /$/, i: "\\n" }, t.CLCM, t.CBCM] },
    a = t.IR + "\\s*\\(",
    c = { keyword: "int float while private char catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and or not", built_in: "std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr", literal: "true false nullptr NULL" },
    n = [e, t.CLCM, t.CBCM, s, r];
  return {
    aliases: ["c", "cc", "h", "c++", "h++", "hpp"],
    k: c,
    i: "</",
    c: n.concat([
      i,
      { b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<", e: ">", k: c, c: ["self", e] },
      { b: t.IR + "::", k: c },
      {
        v: [
          { b: /=/, e: /;/ },
          { b: /\(/, e: /\)/ },
          { bK: "new throw return else", e: /;/ },
        ],
        k: c,
        c: n.concat([{ b: /\(/, e: /\)/, k: c, c: n.concat(["self"]), r: 0 }]),
        r: 0,
      },
      { cN: "function", b: "(" + t.IR + "[\\*&\\s]+)+" + a, rB: !0, e: /[{;=]/, eE: !0, k: c, i: /[^\w\s\*&]/, c: [{ b: a, rB: !0, c: [t.TM], r: 0 }, { cN: "params", b: /\(/, e: /\)/, k: c, r: 0, c: [t.CLCM, t.CBCM, r, s, e] }, t.CLCM, t.CBCM, i] },
      { cN: "class", bK: "class struct", e: /[{;:]/, c: [{ b: /</, e: />/, c: ["self"] }, t.TM] },
    ]),
    exports: { preprocessor: i, strings: r, k: c },
  };
});
hljs.registerLanguage("ruby", function (e) {
  var b = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
    r = { keyword: "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor", literal: "true false nil" },
    c = { cN: "doctag", b: "@[A-Za-z]+" },
    a = { b: "#<", e: ">" },
    s = [e.C("#", "$", { c: [c] }), e.C("^\\=begin", "^\\=end", { c: [c], r: 10 }), e.C("^__END__", "\\n$")],
    n = { cN: "subst", b: "#\\{", e: "}", k: r },
    t = { cN: "string", c: [e.BE, n], v: [{ b: /'/, e: /'/ }, { b: /"/, e: /"/ }, { b: /`/, e: /`/ }, { b: "%[qQwWx]?\\(", e: "\\)" }, { b: "%[qQwWx]?\\[", e: "\\]" }, { b: "%[qQwWx]?{", e: "}" }, { b: "%[qQwWx]?<", e: ">" }, { b: "%[qQwWx]?/", e: "/" }, { b: "%[qQwWx]?%", e: "%" }, { b: "%[qQwWx]?-", e: "-" }, { b: "%[qQwWx]?\\|", e: "\\|" }, { b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/ }, { b: /<<(-?)\w+$/, e: /^\s*\w+$/ }] },
    i = { cN: "params", b: "\\(", e: "\\)", endsParent: !0, k: r },
    d = [
      t,
      a,
      { cN: "class", bK: "class module", e: "$|;", i: /=/, c: [e.inherit(e.TM, { b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?" }), { b: "<\\s*", c: [{ b: "(" + e.IR + "::)?" + e.IR }] }].concat(s) },
      { cN: "function", bK: "def", e: "$|;", c: [e.inherit(e.TM, { b: b }), i].concat(s) },
      { b: e.IR + "::" },
      { cN: "symbol", b: e.UIR + "(\\!|\\?)?:", r: 0 },
      { cN: "symbol", b: ":(?!\\s)", c: [t, { b: b }], r: 0 },
      { cN: "number", b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b", r: 0 },
      { b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))" },
      { cN: "params", b: /\|/, e: /\|/, k: r },
      {
        b: "(" + e.RSR + "|unless)\\s*",
        k: "unless",
        c: [
          a,
          {
            cN: "regexp",
            c: [e.BE, n],
            i: /\n/,
            v: [
              { b: "/", e: "/[a-z]*" },
              { b: "%r{", e: "}[a-z]*" },
              { b: "%r\\(", e: "\\)[a-z]*" },
              { b: "%r!", e: "![a-z]*" },
              { b: "%r\\[", e: "\\][a-z]*" },
            ],
          },
        ].concat(s),
        r: 0,
      },
    ].concat(s);
  (n.c = d), (i.c = d);
  var l = "[>?]>",
    o = "[\\w#]+\\(\\w+\\):\\d+:\\d+>",
    u = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",
    w = [
      { b: /^\s*=>/, starts: { e: "$", c: d } },
      { cN: "meta", b: "^(" + l + "|" + o + "|" + u + ")", starts: { e: "$", c: d } },
    ];
  return { aliases: ["rb", "gemspec", "podspec", "thor", "irb"], k: r, i: /\/\*/, c: s.concat(w).concat(d) };
});
hljs.registerLanguage("yaml", function (e) {
  var b = "true false yes no null",
    a = "^[ \\-]*",
    r = "[a-zA-Z_][\\w\\-]*",
    t = { cN: "attr", v: [{ b: a + r + ":" }, { b: a + '"' + r + '":' }, { b: a + "'" + r + "':" }] },
    c = {
      cN: "template-variable",
      v: [
        { b: "{{", e: "}}" },
        { b: "%{", e: "}" },
      ],
    },
    l = { cN: "string", r: 0, v: [{ b: /'/, e: /'/ }, { b: /"/, e: /"/ }, { b: /\S+/ }], c: [e.BE, c] };
  return { cI: !0, aliases: ["yml", "YAML", "yaml"], c: [t, { cN: "meta", b: "^---s*$", r: 10 }, { cN: "string", b: "[\\|>] *$", rE: !0, c: l.c, e: t.v[0].b }, { b: "<%[%=-]?", e: "[%-]?%>", sL: "ruby", eB: !0, eE: !0, r: 0 }, { cN: "type", b: "!!" + e.UIR }, { cN: "meta", b: "&" + e.UIR + "$" }, { cN: "meta", b: "\\*" + e.UIR + "$" }, { cN: "bullet", b: "^ *-", r: 0 }, e.HCM, { bK: b, k: { literal: b } }, e.CNM, l] };
});
hljs.registerLanguage("css", function (e) {
  var c = "[a-zA-Z-][a-zA-Z0-9_-]*",
    t = {
      b: /[A-Z\_\.\-]+\s*:/,
      rB: !0,
      e: ";",
      eW: !0,
      c: [
        {
          cN: "attribute",
          b: /\S/,
          e: ":",
          eE: !0,
          starts: {
            eW: !0,
            eE: !0,
            c: [
              {
                b: /[\w-]+\(/,
                rB: !0,
                c: [
                  { cN: "built_in", b: /[\w-]+/ },
                  { b: /\(/, e: /\)/, c: [e.ASM, e.QSM] },
                ],
              },
              e.CSSNM,
              e.QSM,
              e.ASM,
              e.CBCM,
              { cN: "number", b: "#[0-9A-Fa-f]+" },
              { cN: "meta", b: "!important" },
            ],
          },
        },
      ],
    };
  return {
    cI: !0,
    i: /[=\/|'\$]/,
    c: [
      e.CBCM,
      { cN: "selector-id", b: /#[A-Za-z0-9_-]+/ },
      { cN: "selector-class", b: /\.[A-Za-z0-9_-]+/ },
      { cN: "selector-attr", b: /\[/, e: /\]/, i: "$" },
      { cN: "selector-pseudo", b: /:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/ },
      { b: "@(font-face|page)", l: "[a-z-]+", k: "font-face page" },
      {
        b: "@",
        e: "[{;]",
        i: /:/,
        c: [
          { cN: "keyword", b: /\w+/ },
          { b: /\s/, eW: !0, eE: !0, r: 0, c: [e.ASM, e.QSM, e.CSSNM] },
        ],
      },
      { cN: "selector-tag", b: c, r: 0 },
      { b: "{", e: "}", i: /\S/, c: [e.CBCM, t] },
    ],
  };
});
hljs.registerLanguage("fortran", function (e) {
  var t = { cN: "params", b: "\\(", e: "\\)" },
    n = {
      literal: ".False. .True.",
      keyword: "kind do while private call intrinsic where elsewhere type endtype endmodule endselect endinterface end enddo endif if forall endforall only contains default return stop then public subroutine|10 function program .and. .or. .not. .le. .eq. .ge. .gt. .lt. goto save else use module select case access blank direct exist file fmt form formatted iostat name named nextrec number opened rec recl sequential status unformatted unit continue format pause cycle exit c_null_char c_alert c_backspace c_form_feed flush wait decimal round iomsg synchronous nopass non_overridable pass protected volatile abstract extends import non_intrinsic value deferred generic final enumerator class associate bind enum c_int c_short c_long c_long_long c_signed_char c_size_t c_int8_t c_int16_t c_int32_t c_int64_t c_int_least8_t c_int_least16_t c_int_least32_t c_int_least64_t c_int_fast8_t c_int_fast16_t c_int_fast32_t c_int_fast64_t c_intmax_t C_intptr_t c_float c_double c_long_double c_float_complex c_double_complex c_long_double_complex c_bool c_char c_null_ptr c_null_funptr c_new_line c_carriage_return c_horizontal_tab c_vertical_tab iso_c_binding c_loc c_funloc c_associated  c_f_pointer c_ptr c_funptr iso_fortran_env character_storage_size error_unit file_storage_size input_unit iostat_end iostat_eor numeric_storage_size output_unit c_f_procpointer ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode newunit contiguous recursive pad position action delim readwrite eor advance nml interface procedure namelist include sequence elemental pure integer real character complex logical dimension allocatable|10 parameter external implicit|10 none double precision assign intent optional pointer target in out common equivalence data",
      built_in:
        "alog alog10 amax0 amax1 amin0 amin1 amod cabs ccos cexp clog csin csqrt dabs dacos dasin datan datan2 dcos dcosh ddim dexp dint dlog dlog10 dmax1 dmin1 dmod dnint dsign dsin dsinh dsqrt dtan dtanh float iabs idim idint idnint ifix isign max0 max1 min0 min1 sngl algama cdabs cdcos cdexp cdlog cdsin cdsqrt cqabs cqcos cqexp cqlog cqsin cqsqrt dcmplx dconjg derf derfc dfloat dgamma dimag dlgama iqint qabs qacos qasin qatan qatan2 qcmplx qconjg qcos qcosh qdim qerf qerfc qexp qgamma qimag qlgama qlog qlog10 qmax1 qmin1 qmod qnint qsign qsin qsinh qsqrt qtan qtanh abs acos aimag aint anint asin atan atan2 char cmplx conjg cos cosh exp ichar index int log log10 max min nint sign sin sinh sqrt tan tanh print write dim lge lgt lle llt mod nullify allocate deallocate adjustl adjustr all allocated any associated bit_size btest ceiling count cshift date_and_time digits dot_product eoshift epsilon exponent floor fraction huge iand ibclr ibits ibset ieor ior ishft ishftc lbound len_trim matmul maxexponent maxloc maxval merge minexponent minloc minval modulo mvbits nearest pack present product radix random_number random_seed range repeat reshape rrspacing scale scan selected_int_kind selected_real_kind set_exponent shape size spacing spread sum system_clock tiny transpose trim ubound unpack verify achar iachar transfer dble entry dprod cpu_time command_argument_count get_command get_command_argument get_environment_variable is_iostat_end ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode is_iostat_eor move_alloc new_line selected_char_kind same_type_as extends_type_ofacosh asinh atanh bessel_j0 bessel_j1 bessel_jn bessel_y0 bessel_y1 bessel_yn erf erfc erfc_scaled gamma log_gamma hypot norm2 atomic_define atomic_ref execute_command_line leadz trailz storage_size merge_bits bge bgt ble blt dshiftl dshiftr findloc iall iany iparity image_index lcobound ucobound maskl maskr num_images parity popcnt poppar shifta shiftl shiftr this_image",
    };
  return { cI: !0, aliases: ["f90", "f95"], k: n, i: /\/\*/, c: [e.inherit(e.ASM, { cN: "string", r: 0 }), e.inherit(e.QSM, { cN: "string", r: 0 }), { cN: "function", bK: "subroutine function program", i: "[${=\\n]", c: [e.UTM, t] }, e.C("!", "$", { r: 0 }), { cN: "number", b: "(?=\\b|\\+|\\-|\\.)(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*)(?:[de][+-]?\\d+)?\\b\\.?", r: 0 }] };
});
hljs.registerLanguage("awk", function (e) {
  var r = { cN: "variable", v: [{ b: /\$[\w\d#@][\w\d_]*/ }, { b: /\$\{(.*?)}/ }] },
    b = "BEGIN END if else while do for in break continue delete next nextfile function func exit|10",
    n = { cN: "string", c: [e.BE], v: [{ b: /(u|b)?r?'''/, e: /'''/, r: 10 }, { b: /(u|b)?r?"""/, e: /"""/, r: 10 }, { b: /(u|r|ur)'/, e: /'/, r: 10 }, { b: /(u|r|ur)"/, e: /"/, r: 10 }, { b: /(b|br)'/, e: /'/ }, { b: /(b|br)"/, e: /"/ }, e.ASM, e.QSM] };
  return { k: { keyword: b }, c: [r, n, e.RM, e.HCM, e.NM] };
});
hljs.registerLanguage("makefile", function (e) {
  var i = { cN: "variable", v: [{ b: "\\$\\(" + e.UIR + "\\)", c: [e.BE] }, { b: /\$[@%<?\^\+\*]/ }] },
    r = { cN: "string", b: /"/, e: /"/, c: [e.BE, i] },
    a = { cN: "variable", b: /\$\([\w-]+\s/, e: /\)/, k: { built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value" }, c: [i] },
    n = { b: "^" + e.UIR + "\\s*[:+?]?=", i: "\\n", rB: !0, c: [{ b: "^" + e.UIR, e: "[:+?]?=", eE: !0 }] },
    t = { cN: "meta", b: /^\.PHONY:/, e: /$/, k: { "meta-keyword": ".PHONY" }, l: /[\.\w]+/ },
    l = { cN: "section", b: /^[^\s]+:/, e: /$/, c: [i] };
  return { aliases: ["mk", "mak"], k: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath", l: /[\w-]+/, c: [e.HCM, i, r, a, n, t, l] };
});
hljs.registerLanguage("java", function (e) {
  var a = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*",
    t = a + "(<" + a + "(\\s*,\\s*" + a + ")*>)?",
    r = "false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do",
    s = "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
    c = { cN: "number", b: s, r: 0 };
  return {
    aliases: ["jsp"],
    k: r,
    i: /<\/|#/,
    c: [
      e.C("/\\*\\*", "\\*/", {
        r: 0,
        c: [
          { b: /\w+@/, r: 0 },
          { cN: "doctag", b: "@[A-Za-z]+" },
        ],
      }),
      e.CLCM,
      e.CBCM,
      e.ASM,
      e.QSM,
      { cN: "class", bK: "class interface", e: /[{;=]/, eE: !0, k: "class interface", i: /[:"\[\]]/, c: [{ bK: "extends implements" }, e.UTM] },
      { bK: "new throw return else", r: 0 },
      { cN: "function", b: "(" + t + "\\s+)+" + e.UIR + "\\s*\\(", rB: !0, e: /[{;=]/, eE: !0, k: r, c: [{ b: e.UIR + "\\s*\\(", rB: !0, r: 0, c: [e.UTM] }, { cN: "params", b: /\(/, e: /\)/, k: r, r: 0, c: [e.ASM, e.QSM, e.CNM, e.CBCM] }, e.CLCM, e.CBCM] },
      c,
      { cN: "meta", b: "@[A-Za-z]+" },
    ],
  };
});
hljs.registerLanguage("stan", function (e) {
  return { c: [e.HCM, e.CLCM, e.CBCM, { b: e.UIR, l: e.UIR, k: { name: "for in while repeat until if then else", symbol: "bernoulli bernoulli_logit binomial binomial_logit beta_binomial hypergeometric categorical categorical_logit ordered_logistic neg_binomial neg_binomial_2 neg_binomial_2_log poisson poisson_log multinomial normal exp_mod_normal skew_normal student_t cauchy double_exponential logistic gumbel lognormal chi_square inv_chi_square scaled_inv_chi_square exponential inv_gamma weibull frechet rayleigh wiener pareto pareto_type_2 von_mises uniform multi_normal multi_normal_prec multi_normal_cholesky multi_gp multi_gp_cholesky multi_student_t gaussian_dlm_obs dirichlet lkj_corr lkj_corr_cholesky wishart inv_wishart", "selector-tag": "int real vector simplex unit_vector ordered positive_ordered row_vector matrix cholesky_factor_corr cholesky_factor_cov corr_matrix cov_matrix", title: "functions model data parameters quantities transformed generated", literal: "true false" }, r: 0 }, { cN: "number", b: "0[xX][0-9a-fA-F]+[Li]?\\b", r: 0 }, { cN: "number", b: "0[xX][0-9a-fA-F]+[Li]?\\b", r: 0 }, { cN: "number", b: "\\d+(?:[eE][+\\-]?\\d*)?L\\b", r: 0 }, { cN: "number", b: "\\d+\\.(?!\\d)(?:i\\b)?", r: 0 }, { cN: "number", b: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b", r: 0 }, { cN: "number", b: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b", r: 0 }] };
});
hljs.registerLanguage("javascript", function (e) {
  var r = "[A-Za-z$_][0-9A-Za-z$_]*",
    t = { keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as", literal: "true false null undefined NaN Infinity", built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise" },
    a = { cN: "number", v: [{ b: "\\b(0[bB][01]+)" }, { b: "\\b(0[oO][0-7]+)" }, { b: e.CNR }], r: 0 },
    n = { cN: "subst", b: "\\$\\{", e: "\\}", k: t, c: [] },
    c = { cN: "string", b: "`", e: "`", c: [e.BE, n] };
  n.c = [e.ASM, e.QSM, c, a, e.RM];
  var s = n.c.concat([e.CBCM, e.CLCM]);
  return {
    aliases: ["js", "jsx"],
    k: t,
    c: [
      { cN: "meta", r: 10, b: /^\s*['"]use (strict|asm)['"]/ },
      { cN: "meta", b: /^#!/, e: /$/ },
      e.ASM,
      e.QSM,
      c,
      e.CLCM,
      e.CBCM,
      a,
      { b: /[{,]\s*/, r: 0, c: [{ b: r + "\\s*:", rB: !0, r: 0, c: [{ cN: "attr", b: r, r: 0 }] }] },
      {
        b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
        k: "return throw case",
        c: [
          e.CLCM,
          e.CBCM,
          e.RM,
          { cN: "function", b: "(\\(.*?\\)|" + r + ")\\s*=>", rB: !0, e: "\\s*=>", c: [{ cN: "params", v: [{ b: r }, { b: /\(\s*\)/ }, { b: /\(/, e: /\)/, eB: !0, eE: !0, k: t, c: s }] }] },
          {
            b: /</,
            e: /(\/\w+|\w+\/)>/,
            sL: "xml",
            c: [
              { b: /<\w+\s*\/>/, skip: !0 },
              { b: /<\w+/, e: /(\/\w+|\w+\/)>/, skip: !0, c: [{ b: /<\w+\s*\/>/, skip: !0 }, "self"] },
            ],
          },
        ],
        r: 0,
      },
      { cN: "function", bK: "function", e: /\{/, eE: !0, c: [e.inherit(e.TM, { b: r }), { cN: "params", b: /\(/, e: /\)/, eB: !0, eE: !0, c: s }], i: /\[|%/ },
      { b: /\$[(.]/ },
      e.METHOD_GUARD,
      { cN: "class", bK: "class", e: /[{;=]/, eE: !0, i: /[:"\[\]]/, c: [{ bK: "extends" }, e.UTM] },
      { bK: "constructor", e: /\{/, eE: !0 },
    ],
    i: /#(?!!)/,
  };
});
hljs.registerLanguage("tex", function (c) {
  var e = {
    cN: "tag",
    b: /\\/,
    r: 0,
    c: [
      {
        cN: "name",
        v: [{ b: /[a-zA-Zа-яА-я]+[*]?/ }, { b: /[^a-zA-Zа-яА-я0-9]/ }],
        starts: {
          eW: !0,
          r: 0,
          c: [
            {
              cN: "string",
              v: [
                { b: /\[/, e: /\]/ },
                { b: /\{/, e: /\}/ },
              ],
            },
            { b: /\s*=\s*/, eW: !0, r: 0, c: [{ cN: "number", b: /-?\d*\.?\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?/ }] },
          ],
        },
      },
    ],
  };
  return {
    c: [
      e,
      {
        cN: "formula",
        c: [e],
        r: 0,
        v: [
          { b: /\$\$/, e: /\$\$/ },
          { b: /\$/, e: /\$/ },
        ],
      },
      c.C("%", "$", { r: 0 }),
    ],
  };
});
hljs.registerLanguage("xml", function (s) {
  var e = "[A-Za-z0-9\\._:-]+",
    t = {
      eW: !0,
      i: /</,
      r: 0,
      c: [
        { cN: "attr", b: e, r: 0 },
        { b: /=\s*/, r: 0, c: [{ cN: "string", endsParent: !0, v: [{ b: /"/, e: /"/ }, { b: /'/, e: /'/ }, { b: /[^\s"'=<>`]+/ }] }] },
      ],
    };
  return {
    aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist"],
    cI: !0,
    c: [
      { cN: "meta", b: "<!DOCTYPE", e: ">", r: 10, c: [{ b: "\\[", e: "\\]" }] },
      s.C("<!--", "-->", { r: 10 }),
      { b: "<\\!\\[CDATA\\[", e: "\\]\\]>", r: 10 },
      { b: /<\?(php)?/, e: /\?>/, sL: "php", c: [{ b: "/\\*", e: "\\*/", skip: !0 }] },
      { cN: "tag", b: "<style(?=\\s|>|$)", e: ">", k: { name: "style" }, c: [t], starts: { e: "</style>", rE: !0, sL: ["css", "xml"] } },
      { cN: "tag", b: "<script(?=\\s|>|$)", e: ">", k: { name: "script" }, c: [t], starts: { e: "</script>", rE: !0, sL: ["actionscript", "javascript", "handlebars", "xml"] } },
      {
        cN: "meta",
        v: [
          { b: /<\?xml/, e: /\?>/, r: 10 },
          { b: /<\?\w+/, e: /\?>/ },
        ],
      },
      { cN: "tag", b: "</?", e: "/?>", c: [{ cN: "name", b: /[^\/><\s]+/, r: 0 }, t] },
    ],
  };
});
hljs.registerLanguage("markdown", function (e) {
  return {
    aliases: ["md", "mkdown", "mkd"],
    c: [
      { cN: "section", v: [{ b: "^#{1,6}", e: "$" }, { b: "^.+?\\n[=-]{2,}$" }] },
      { b: "<", e: ">", sL: "xml", r: 0 },
      { cN: "bullet", b: "^([*+-]|(\\d+\\.))\\s+" },
      { cN: "strong", b: "[*_]{2}.+?[*_]{2}" },
      { cN: "emphasis", v: [{ b: "\\*.+?\\*" }, { b: "_.+?_", r: 0 }] },
      { cN: "quote", b: "^>\\s+", e: "$" },
      { cN: "code", v: [{ b: "^```w*s*$", e: "^```s*$" }, { b: "`.+?`" }, { b: "^( {4}|	)", e: "$", r: 0 }] },
      { b: "^[-\\*]{3,}", e: "$" },
      {
        b: "\\[.+?\\][\\(\\[].*?[\\)\\]]",
        rB: !0,
        c: [
          { cN: "string", b: "\\[", e: "\\]", eB: !0, rE: !0, r: 0 },
          { cN: "link", b: "\\]\\(", e: "\\)", eB: !0, eE: !0 },
          { cN: "symbol", b: "\\]\\[", e: "\\]", eB: !0, eE: !0 },
        ],
        r: 10,
      },
      {
        b: /^\[[^\n]+\]:/,
        rB: !0,
        c: [
          { cN: "symbol", b: /\[/, e: /\]/, eB: !0, eE: !0 },
          { cN: "link", b: /:\s*/, e: /$/, eB: !0 },
        ],
      },
    ],
  };
});
hljs.registerLanguage("json", function (e) {
  var i = { literal: "true false null" },
    n = [e.QSM, e.CNM],
    r = { e: ",", eW: !0, eE: !0, c: n, k: i },
    t = { b: "{", e: "}", c: [{ cN: "attr", b: /"/, e: /"/, c: [e.BE], i: "\\n" }, e.inherit(r, { b: /:/ })], i: "\\S" },
    c = { b: "\\[", e: "\\]", c: [e.inherit(r)], i: "\\S" };
  return n.splice(n.length, 0, t, c), { c: n, k: i, i: "\\S" };
});
